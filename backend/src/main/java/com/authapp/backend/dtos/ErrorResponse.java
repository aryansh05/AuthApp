package com.authapp.backend.dtos;

public record ErrorResponse(
    String message,
    int status
) {
    
}
