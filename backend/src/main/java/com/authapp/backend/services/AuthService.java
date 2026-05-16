package com.authapp.backend.services;

import com.authapp.backend.dtos.UserDto;

public interface AuthService {

    UserDto registerUser(UserDto userDto);
    
    
}
