package com.authapp.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.authapp.backend.dtos.LoginRequest;
import com.authapp.backend.dtos.RefreshTokenRequest;
import com.authapp.backend.dtos.TokenResponse;
import com.authapp.backend.dtos.UserDto;
import com.authapp.backend.services.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> loginUser(@RequestBody LoginRequest loginRequest, HttpServletResponse response){
        return ResponseEntity.ok(authService.loginUser(loginRequest, response));
    }

   @PostMapping("/refresh")
    public ResponseEntity<TokenResponse> refreshTokenUser(@RequestBody(required = false) RefreshTokenRequest body, HttpServletResponse response, HttpServletRequest request){
        return ResponseEntity.ok(authService.refreshTokenUser(body, request, response));
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        authService.logoutUser(request, response);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> registerUser(@RequestBody UserDto userDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registerUser(userDto));
    }

}
