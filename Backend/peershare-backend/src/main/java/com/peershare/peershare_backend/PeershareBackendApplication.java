package com.peershare.peershare_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.peershare.peershare_backend.entities.Roles;
import com.peershare.peershare_backend.repositories.RolesRepository;
import com.peershare.peershare_backend.utils.AppConstants;

@SpringBootApplication
public class PeerShareBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(PeerShareBackendApplication.class, args);
	}

	@Autowired
	private RolesRepository rolesRepository;
	
	@Override
	public void run(String... args) throws Exception {
		try {
			Roles userRole = new Roles(AppConstants.ROLE_USER_ID,AppConstants.ROLE_USER_NAME);
			this.rolesRepository.save(userRole);
			Roles adminRole = new Roles(AppConstants.ROLE_ADMIN_ID, AppConstants.ROLE_ADMIN_NAME);
			this.rolesRepository.save(adminRole);
			System.out.println("hello");
			System.out.println(this.rolesRepository.findAll());
		} catch (Exception e) {
			// exceptions have to be handled later...
			e.printStackTrace();
		}
	}

}
