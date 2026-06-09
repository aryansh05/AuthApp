package com.authapp.backend.security;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.authapp.backend.entities.Provider;
import com.authapp.backend.entities.RefreshToken;
import com.authapp.backend.entities.User;
import com.authapp.backend.repositories.RefreshTokenRepository;
import com.authapp.backend.repositories.UserRepository;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler{

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final RefreshTokenRepository refreshTokenRepository;
    private final CookieService cookieService;
    @Value("${app.auth.frontend.success-redirect}")
    private String frontendSuccessUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();

        String registrationId = "unknown";
        if(authentication instanceof OAuth2AuthenticationToken token){
            registrationId = token.getAuthorizedClientRegistrationId();
        }
        
        User user;
        switch (registrationId) {
            case "google" -> {
                String googleId = oauth2User.getAttributes().getOrDefault("sub", "").toString();
                String email = oauth2User.getAttributes().getOrDefault("email", "").toString();
                String name = oauth2User.getAttributes().getOrDefault("name", "").toString();
                String picture = oauth2User.getAttributes().getOrDefault("picture", "").toString();

                User newUser = User.builder()
                    .email(email)
                    .name(name)
                    .image(picture)
                    .enable(true)
                    .provider(Provider.GOOGLE)
                    .providerId(googleId)
                    .build();

                user = userRepository.findByEmail(email).orElseGet(() -> userRepository.save(newUser));

            }
            case "github" -> {
                String githubId = oauth2User.getAttributes().getOrDefault("id", "").toString();
                String name = oauth2User.getAttributes().getOrDefault("login", "").toString();
                Object rawEmail = oauth2User.getAttributes().get("email");
                String email = (rawEmail != null && !rawEmail.toString().isBlank()) 
                ? rawEmail.toString() 
                : githubId + "+" + name + "@users.noreply.github.com";
                String picture = oauth2User.getAttributes().getOrDefault("avatar_url", "").toString();

                User newUser = User.builder()
                    .email(email)
                    .name(name)
                    .image(picture)
                    .enable(true)
                    .provider(Provider.GITHUB)
                    .providerId(githubId)
                    .build();

                user = userRepository.findByEmail(email).orElseGet(() -> userRepository.save(newUser));

            }
            default -> throw new RuntimeException("Invalid OAuth2 provider: " + registrationId);
        }

        String jti = UUID.randomUUID().toString();
        RefreshToken refreshTokenObj = RefreshToken.builder()
            .jti(jti)
            .user(user)
            .revoked(false)
            .createdAt(Instant.now())
            .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
            .build();
        
        refreshTokenRepository.save(refreshTokenObj);
        
        // String accessToken = jwtService.generateAccessToken(user);
        String refreshToken = jwtService.generateRefreshToken(user, refreshTokenObj.getJti());

        cookieService.attachRefreshCookie(response, refreshToken, (int)jwtService.getRefreshTtlSeconds());
        cookieService.addNoStoreHeaders(response);

        response.sendRedirect(frontendSuccessUrl);
    }
    
}
