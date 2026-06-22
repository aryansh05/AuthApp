package com.authapp.backend.dtos;

public record LoginRequest(
    String email,
    String password
) {

}
