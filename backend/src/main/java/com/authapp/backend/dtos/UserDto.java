package com.authapp.backend.dtos;

import java.time.Instant;
import java.util.Set;
import java.util.UUID;

import com.authapp.backend.entities.Provider;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder

public class UserDto {

    private UUID id;

    private String email;
    private String name;
    private String password;
    private String image;
    
    private Boolean enable;

    private Instant createdAt;
    private Instant updatedAt;

    private Provider provider;
    private String providerId;

    private Set<RoleDto> roles;   
    
}
