package com.authapp.backend.services;

import com.authapp.backend.dtos.LoginRequest;
import com.authapp.backend.dtos.RefreshTokenRequest;
import com.authapp.backend.dtos.TokenResponse;
import com.authapp.backend.dtos.UserDto;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface AuthService {

    UserDto registerUser(UserDto userDto);

    TokenResponse loginUser(LoginRequest loginRequest, HttpServletResponse response);

    TokenResponse refreshTokenUser(RefreshTokenRequest body, HttpServletRequest request, HttpServletResponse response);

    void logoutUser(HttpServletRequest request, HttpServletResponse response);
     
}
