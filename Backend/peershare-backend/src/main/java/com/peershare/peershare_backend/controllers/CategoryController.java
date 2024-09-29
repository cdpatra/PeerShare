package com.peershare.peershare_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.peershare.peershare_backend.entities.Category;
import com.peershare.peershare_backend.services.CategoryService;

@RestController
public class CategoryController {

   @Autowired
   private CategoryService categoryService;

   @GetMapping("/category")
   public List<Category> getCategory() {
      return categoryService.getAllCategories();
   }
}
