package com.authapp.backend.dtos;

import org.springframework.http.HttpStatus;

public record ErrorResponse(
    String message,
    HttpStatus status
) {
    
}
