package com.peershare.peershare_backend.dao;

import org.springframework.data.repository.CrudRepository;

import com.peershare.peershare_backend.entities.Category;

public interface CategoryRepository extends CrudRepository<Category, Integer> {

}
