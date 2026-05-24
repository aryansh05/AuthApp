package com.authapp.backend.security;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.authapp.backend.entities.Role;
import com.authapp.backend.entities.User;
import com.authapp.backend.helpers.UserHelper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;
import lombok.Setter;

@Service
@Getter
@Setter
public class JwtService {
    
    private final SecretKey secretKey;
    private final long accessTtlSeconds;
    private final long refreshTtlSeconds;
    private final String issuer;

    public JwtService(
        @Value("${security.jwt.secret}") String secretKey,
        @Value("${security.jwt.access-ttl-seconds}") long accessTtlSeconds,
        @Value("${security.jwt.refresh-ttl-seconds}") long refreshTtlSeconds,
        @Value("${security.jwt.issuer}") String issuer) {
            if(secretKey == null || secretKey.length() < 64) {
                throw new IllegalArgumentException("JWT secret key must be at least 64 characters long");
            }

            this.secretKey = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
            this.accessTtlSeconds = accessTtlSeconds;
            this.refreshTtlSeconds = refreshTtlSeconds;
            this.issuer = issuer;
    }

    public String generateAccessToken(User user){
        Instant now = Instant.now();
        List<String> roles = user.getRoles() == null ? List.of() : user.getRoles().stream()
            .map(Role::getName)
            .toList();

        return Jwts.builder()
            .id(UUID.randomUUID().toString())
            .subject(user.getId().toString())
            .issuer(issuer)
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plusSeconds(accessTtlSeconds)))
            .claim("email", user.getEmail())
            .claim("roles", roles)
            .claim("type", "access")
            .signWith(secretKey)
            .compact();
    }

    public String generateRefreshToken(User user, String jti){
        Instant now = Instant.now();

        return Jwts.builder()
            .id(jti)
            .subject(user.getId().toString())
            .issuer(issuer)
            .issuedAt(Date.from(now))
            .expiration(Date.from(now.plusSeconds(refreshTtlSeconds)))
            .claim("type", "refresh")
            .signWith(secretKey)
            .compact();
    }

    public Jws<Claims> parseToken(String token) {
        return Jwts.parser()
            .verifyWith(secretKey)
            .build()
            .parseSignedClaims(token);
    }

    public boolean isAccessToken(String token) {
        Claims claims = parseToken(token).getPayload();
        return "access".equals(claims.get("type"));
    }
    
    public boolean isRefreshToken(String token) {
        Claims claims = parseToken(token).getPayload();
        return "refresh".equals(claims.get("type"));
    }

    public UUID getUserIdFromToken(String token) {
        Claims claims = parseToken(token).getPayload();
        return UserHelper.parseUserId(claims.getSubject());
    }

    public String getJti(String token) {
        Claims claims = parseToken(token).getPayload();
        return claims.getId();
    }

}
