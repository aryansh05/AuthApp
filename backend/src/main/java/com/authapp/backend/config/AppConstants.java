package com.authapp.backend.config;

public class AppConstants {
    
    public static final String[] AUTH_PUBLIC_ENDPOINTS = {
        "/api/v1/auth/**",
        "/v3/api-docs/**",
        "/swagger-ui/**",
        "/swagger-ui.html",
    };

    public static final String ADMIN_ROLE = "ADMIN";
    public static final String GUEST_ROLE = "GUEST";

    public static final String[] AUTH_ADMIN_URLS= {
            "/api/v1/users/**"
    };

    public static final String[] AUTH_GUEST_URLS= {

    };

}
