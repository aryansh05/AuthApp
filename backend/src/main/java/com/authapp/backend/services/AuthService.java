package com.authapp.backend.services;

import com.authapp.backend.dtos.LoginRequest;
import com.authapp.backend.dtos.TokenResponse;
import com.authapp.backend.dtos.UserDto;

public interface AuthService {

    UserDto registerUser(UserDto userDto);

    TokenResponse loginUser(LoginRequest loginRequest);
     
}
