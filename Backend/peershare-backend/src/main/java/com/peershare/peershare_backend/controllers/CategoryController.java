package com.peershare.peershare_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.peershare.peershare_backend.payloads.ApiResponse;
import com.peershare.peershare_backend.payloads.CategoryDto;
import com.peershare.peershare_backend.services.CategoryService;

@RestController
@RequestMapping("/users/category")
public class CategoryController {

   @Autowired
   private CategoryService categoryService;

   // Read Handler
   @GetMapping()
   public ResponseEntity<List<CategoryDto>> getAllCategories() {
      List<CategoryDto> allCategories = categoryService.getAllCategories();
<<<<<<< HEAD
      return new ResponseEntity<>(allCategories, HttpStatus.FOUND);
=======
      return new ResponseEntity<>(allCategories, HttpStatus.OK);
>>>>>>> 48d436489ef3dc52c732bf4268c34e450dff32b3
   }

   @GetMapping("/{id}")
   public ResponseEntity<CategoryDto> getCategoryById(@PathVariable("id") int id) {
      CategoryDto requiredCategory = categoryService.getCategoryById(id);
<<<<<<< HEAD
      return new ResponseEntity<>(requiredCategory, HttpStatus.FOUND);
=======
      return new ResponseEntity<>(requiredCategory, HttpStatus.OK);
>>>>>>> 48d436489ef3dc52c732bf4268c34e450dff32b3
   }

   // Create Handler
   @PostMapping()
   public ResponseEntity<CategoryDto> addCategory(@RequestBody CategoryDto category) {
      CategoryDto newCategory = categoryService.addCategory(category);
      return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
   }

   // Delete Handler
   @DeleteMapping()
   public ResponseEntity<ApiResponse> deleteAllCategories() {
      categoryService.deleteAllCategories();
      return new ResponseEntity<>(new ApiResponse("All categories deleted successfully", true), HttpStatus.OK);
   }

   @DeleteMapping("/{id}")
   public ResponseEntity<ApiResponse> deleteCategoryById(@PathVariable("id") int id) {
      categoryService.deleteCategoryById(id);
      return new ResponseEntity<>(new ApiResponse("Category deleted successfully", true), HttpStatus.OK);
   }

   // Update Handler
   @PutMapping("/{id}")
   public ResponseEntity<CategoryDto> updateCategoryById(@RequestBody CategoryDto updatedCategory,
         @PathVariable("id") int id) {
      CategoryDto requiredUpdatedCategory = categoryService.updateCategoryById(updatedCategory, id);
      return new ResponseEntity<>(requiredUpdatedCategory, HttpStatus.OK);
   }

}
