package com.authapp.backend.services;

import java.util.List;

import com.authapp.backend.dtos.UserDto;

public interface UserService {

    UserDto createUser(UserDto userDto);

    UserDto getUserByEmail(String email);

    UserDto updateUser(String userId, UserDto userDto);

    void deleteUser(String userId);

    UserDto getUserById(String userId);

    List<UserDto> getAllUsers();

}
