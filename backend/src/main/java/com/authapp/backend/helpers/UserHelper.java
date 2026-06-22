package com.authapp.backend.helpers;

import java.util.UUID;

public class UserHelper {
    
    public static UUID parseUserId(String uuid) {
        try {
            return UUID.fromString(uuid);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid user ID format: " + uuid);
        }
    }

}
