package com.authapp.backend;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.authapp.backend.config.AppConstants;
import com.authapp.backend.entities.Role;
import com.authapp.backend.repositories.RoleRepository;

@SpringBootApplication
public class BackendApplication {

	@Autowired
    private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

    public void run(String... args) throws Exception {
        roleRepository.findByName("ROLE_"+AppConstants.ADMIN_ROLE).ifPresentOrElse(role->{
            System.out.println("Admin Role Already Exists: "+role.getName());
        },()->{

            Role role=new Role();
            role.setName("ROLE_"+AppConstants.ADMIN_ROLE);
            role.setId(UUID.randomUUID());
            roleRepository.save(role);

        });

        roleRepository.findByName("ROLE_"+AppConstants.GUEST_ROLE).ifPresentOrElse(role->{
            System.out.println("Guest Role Already Exists: "+role.getName());
        },()->{

            Role role=new Role();
            role.setName("ROLE_"+AppConstants.GUEST_ROLE);
            role.setId(UUID.randomUUID());
            roleRepository.save(role);

        });
    }

}
