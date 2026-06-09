package com.authapp.backend.security;

import java.io.IOException;
import java.util.UUID;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.authapp.backend.helpers.UserHelper;
import com.authapp.backend.repositories.UserRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter{
    
    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
                String authHeader = request.getHeader("Authorization");
                if (authHeader != null && authHeader.startsWith("Bearer ")) {
                    String token = authHeader.substring(7);
                    try {
                        if(!jwtService.isAccessToken(token)) {
                            filterChain.doFilter(request, response);
                            return;
                        }
                        Jws<Claims> parse = jwtService.parseToken(token);
                        Claims payload = parse.getPayload();
                        String userId = payload.getSubject();
                        UUID userUuid = UserHelper.parseUserId(userId);

                        userRepository.findById(userUuid)
                            .ifPresent(user -> {
                                if(user.isEnabled()) {
                                
                                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                                    user.getEmail(), null, user.getAuthorities()
                                );

                                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                                if(SecurityContextHolder.getContext().getAuthentication() == null) {
                                SecurityContextHolder.getContext().setAuthentication(authToken);
                                }
                            }
                            });

                    } catch (ExpiredJwtException e) {
                        request.setAttribute("error", "Token Expired");
                    } catch (JwtException | IllegalArgumentException e) {
                        request.setAttribute("error", "Invalid Token");
                    }
                }
                filterChain.doFilter(request, response);
            }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        return request.getRequestURI().startsWith("/api/v1/auth");
    }

}
