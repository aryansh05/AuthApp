package com.authapp.backend.services.impl;

import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.authapp.backend.dtos.LoginRequest;
import com.authapp.backend.dtos.TokenResponse;
import com.authapp.backend.dtos.UserDto;
import com.authapp.backend.entities.User;
import com.authapp.backend.repositories.UserRepository;
import com.authapp.backend.security.JwtService;
import com.authapp.backend.services.AuthService;
import com.authapp.backend.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final ModelMapper modelMapper;

    @Override
    public UserDto registerUser(UserDto userDto) {
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        UserDto registeredUser = userService.createUser(userDto);

        return registeredUser;
    }

    @Override
    public TokenResponse loginUser(LoginRequest loginRequest) {
        authentication(loginRequest);
        User user = userRepository.findByEmail(loginRequest.email()).orElseThrow(() -> new BadCredentialsException("Invalid Username or Password"));

        String accessToken = jwtService.generateAccessToken(user);
        return TokenResponse.of(
            accessToken, 
            "", 
            jwtService.getAccessTtlSeconds(), 
            modelMapper.map(user, UserDto.class)
        );
    }

    private Authentication authentication(LoginRequest loginRequest) {
        try {
            return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequest.email(), loginRequest.password()));
        } catch (AuthenticationException e) {
            throw new BadCredentialsException("Invalid Username or Password");
        }
    }
    
}
