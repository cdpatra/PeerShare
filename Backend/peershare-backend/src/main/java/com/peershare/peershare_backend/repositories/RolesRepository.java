package com.peershare.peershare_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.peershare.peershare_backend.entities.Roles;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Integer>{

}
