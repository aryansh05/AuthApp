package com.authapp.backend.config;

import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "Authentication Application built by Aryan Sharma",
        version = "0.0.1",
        description = "AuthApp - A user authentication and management system",
        contact = @Contact(
            name = "Aryan Sharma",
            url = "/",
            email = "aryansharmash12@gmail.com"
        ),
        summary = "Useful for having auth services for your applications instead built from scratch"
    ),
    security = {
        @SecurityRequirement(
            name = "bearerAuth"
        )
    }
)
@SecurityScheme(
    name = "bearerAuth",
    type = SecuritySchemeType.HTTP,
    scheme = "bearer",
    bearerFormat = "JWT"
)
public class APIDocConfig {

}
