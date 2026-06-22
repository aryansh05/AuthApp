package com.authapp.backend.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.authapp.backend.entities.RefreshToken;

public interface  RefreshTokenRepository extends JpaRepository<RefreshToken, UUID>{
   
    Optional<RefreshToken> findByJti(String jti);
    
}
