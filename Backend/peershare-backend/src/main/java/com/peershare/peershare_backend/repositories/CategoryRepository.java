package com.peershare.peershare_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peershare.peershare_backend.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

}
