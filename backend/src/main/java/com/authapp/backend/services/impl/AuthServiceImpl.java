package com.authapp.backend.services.impl;

import org.springframework.stereotype.Service;

import com.authapp.backend.dtos.UserDto;
import com.authapp.backend.services.AuthService;
import com.authapp.backend.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;

    @Override
    public UserDto registerUser(UserDto userDto) {
        
        UserDto registeredUser = userService.createUser(userDto);

        return registeredUser;

    }

    
}
