package com.authapp.backend.services.impl;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.authapp.backend.dtos.UserDto;
import com.authapp.backend.entities.User;
import com.authapp.backend.exceptions.ResourceNotFoundException;
import com.authapp.backend.helpers.UserHelper;
import com.authapp.backend.repositories.UserRepository;
import com.authapp.backend.services.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    
    @Override
    @Transactional
    public UserDto createUser(UserDto userDto) {
        if(userDto.getEmail() == null || userDto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if(userRepository.existsByEmail(userDto.getEmail())) {
            throw new IllegalArgumentException("User with email " + userDto.getEmail() + " already exists");
        }

        User user = modelMapper.map(userDto, User.class);
        User savedUser = userRepository.save(user);

        return modelMapper.map(savedUser, UserDto.class);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    @Transactional
    public UserDto updateUser(String userId, UserDto userDto) {
        UUID uId = UserHelper.parseUserId(userId);
        User existingUser = userRepository.findById(uId).orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        if(userDto.getName() != null) {
            existingUser.setName(userDto.getName());
        }
        if(userDto.getPassword() != null) {
            existingUser.setPassword(userDto.getPassword());
        }
        if(userDto.getImage() != null) {
            existingUser.setImage(userDto.getImage());
        }
        if(userDto.getProvider() != null) {
            existingUser.setProvider(userDto.getProvider());
        }
        if(userDto.getEnable() != null) {
            existingUser.setEnable(userDto.getEnable());
        }

        User updatedUser = userRepository.saveAndFlush(existingUser);
        
        return modelMapper.map(updatedUser, UserDto.class);
    }

    @Override
    @Transactional
    public void deleteUser(String userId) {
        UUID uID = UserHelper.parseUserId(userId);
        User user = userRepository.findById(uID).orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        userRepository.delete(user);
    }

    @Override
    @Transactional(readOnly = true)
    public UserDto getUserById(String userId) {
        User user = userRepository.findById(UserHelper.parseUserId(userId)).orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        return modelMapper.map(user, UserDto.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
       return userRepository.findAll().stream().map(user -> modelMapper.map(user, UserDto.class)).toList(); 
    }
    
}
