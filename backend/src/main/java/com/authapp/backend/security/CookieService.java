package com.authapp.backend.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import lombok.Setter;

@Service
@Getter
@Setter
public class CookieService {
    
    private final String refreshTokenCookieName;
    private final String cookieDomain;
    private final String cookieSameSite;
    private final boolean cookieSecure;
    private final boolean cookieHttpOnly;

    public CookieService(
        @Value("${security.jwt.refresh-token-cookie-name}")String refreshTokenCookieName, 
        @Value("${security.jwt.cookie-domain}")String cookieDomain, 
        @Value("${security.jwt.cookie-same-site}")String cookieSameSite,
        @Value("${security.jwt.cookie-secure}")boolean cookieSecure, 
        @Value("${security.jwt.cookie-http-only}")boolean cookieHttpOnly) {
        this.refreshTokenCookieName = refreshTokenCookieName;
        this.cookieDomain = cookieDomain;
        this.cookieSameSite = cookieSameSite;
        this.cookieSecure = cookieSecure;
        this.cookieHttpOnly = cookieHttpOnly;
    }

    public void attachRefreshCookie(HttpServletResponse response, String value, int maxAge){
        var responseCookieBuilder = ResponseCookie.from(refreshTokenCookieName, value)
            .httpOnly(cookieHttpOnly)
            .secure(cookieSecure)
            .path("/")
            .maxAge(maxAge)
            .sameSite(cookieSameSite);
        
        if(cookieDomain != null && !cookieDomain.isBlank()){
            responseCookieBuilder.domain(cookieDomain);
        }

        ResponseCookie responseCookie = responseCookieBuilder.build();
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
    }    
    
    public void clearRefreshCookie(HttpServletResponse response){
        var responseCookieBuilder = ResponseCookie.from(refreshTokenCookieName, "")
            .maxAge(0)
            .httpOnly(cookieHttpOnly)
            .path("/")
            .sameSite(cookieSameSite)
            .secure(cookieSecure);       
        
        if(cookieDomain != null && !cookieDomain.isBlank()){
            responseCookieBuilder.domain(cookieDomain);
        }

        ResponseCookie responseCookie = responseCookieBuilder.build();
        response.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
    }  
    
    public void addNoStoreHeaders(HttpServletResponse response){
        response.setHeader(HttpHeaders.CACHE_CONTROL, "no-store");
        response.setHeader("Pragma", "no-cache");
    }

}
