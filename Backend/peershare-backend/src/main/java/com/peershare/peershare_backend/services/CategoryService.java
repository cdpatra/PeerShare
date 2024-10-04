package com.peershare.peershare_backend.services;

import java.util.List;

import com.peershare.peershare_backend.payloads.CategoryDto;

public interface CategoryService {

   public List<CategoryDto> getAllCategories();

   public CategoryDto getCategoryById(int id);

   public CategoryDto addCategory(CategoryDto categoryDto);

   public void deleteCategoryById(int id);

   public void deleteAllCategories();

   public CategoryDto updateCategoryById(CategoryDto updatedCategoryDto, int id);
}
