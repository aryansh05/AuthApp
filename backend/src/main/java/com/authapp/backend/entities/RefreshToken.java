package com.authapp.backend.entities;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name="refresh_tokens", indexes={
    @Index(name="refresh_tokens_jti_idx", columnList="jti", unique=true),
    @Index(name="refresh_tokens_user_id_idx", columnList = "user_id")
})
public class RefreshToken {
    
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private UUID id;

    @Column(name="jti", unique=true, nullable=false, updatable=false)
    private String jti;
    private String replacedByToken;

    @ManyToOne(optional=false, fetch=FetchType.LAZY)
    @JoinColumn(name="user_id", nullable=false, updatable=false)
    private User user;

    @Column(updatable=false, nullable=false)
    private Instant createdAt;
    @Column(nullable=false)
    private Instant expiresAt;

    @Column(nullable=false)
    private boolean revoked;

}
