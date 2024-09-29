package com.peershare.peershare_backend.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peershare.peershare_backend.dao.CategoryRepository;
import com.peershare.peershare_backend.entities.Category;

@Service
public class CategoryService {

   @Autowired
   private CategoryRepository categoryRepository;

   public List<Category> getAllCategories() {
      return (List<Category>) categoryRepository.findAll();
   }
}
