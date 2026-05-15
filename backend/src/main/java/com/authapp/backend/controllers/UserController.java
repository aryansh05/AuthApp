package com.authapp.backend.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.authapp.backend.dtos.UserDto;
import com.authapp.backend.services.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDto> createUser(@RequestBody UserDto userDto){

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(userDto));

    }

    @GetMapping
    public ResponseEntity<List<UserDto>> getAllUsers(){

        return ResponseEntity.ok(userService.getAllUsers());

    }

    @GetMapping("/email/{email}")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable("email") String email){

        return ResponseEntity.ok(userService.getUserByEmail(email));

    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable("userId") String userId){

        userService.deleteUser(userId);

        return ResponseEntity.noContent().build();

    }

    @PatchMapping("/{userId}")
    public ResponseEntity<UserDto> updateUser(@PathVariable("userId") String userId, @RequestBody UserDto userDto){

        return ResponseEntity.ok(userService.updateUser(userId, userDto));

    }

    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("userId") String userId){

        return ResponseEntity.ok(userService.getUserById(userId));

    }

}   

