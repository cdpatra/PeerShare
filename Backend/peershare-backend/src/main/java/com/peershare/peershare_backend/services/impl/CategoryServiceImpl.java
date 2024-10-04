package com.peershare.peershare_backend.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peershare.peershare_backend.entities.Category;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.CategoryDto;
import com.peershare.peershare_backend.repositories.CategoryRepository;
import com.peershare.peershare_backend.services.CategoryService;

@Service
public class CategoryServiceImpl implements CategoryService {

   @Autowired
   private CategoryRepository categoryRepository;

   @Autowired
   private ModelMapper modelMapper;

   @Override
   public CategoryDto addCategory(CategoryDto categoryDto) {
      Category category = dtoToCategory(categoryDto);
      Category savedCategory = this.categoryRepository.save(category);
      return categoryToDto(savedCategory);
   }

   @Override
   public void deleteAllCategories() {
      this.categoryRepository.deleteAll();
   }

   @Override
   public void deleteCategoryById(int id) {
      Category originalCategory = this.categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));
      this.categoryRepository.delete(originalCategory);
   }

   @Override
   public List<CategoryDto> getAllCategories() {
      List<Category> allCategories = this.categoryRepository.findAll();
      return allCategories.stream().map((category) -> categoryToDto(category)).collect(Collectors.toList());
   }

   @Override
   public CategoryDto getCategoryById(int id) {
      Category originalCategory = this.categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

      return categoryToDto(originalCategory);
   }

   @Override
   public CategoryDto updateCategoryById(CategoryDto updatedCategoryDto, int id) {

      Category originalCategory = this.categoryRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "id", id));

      originalCategory.setCategoryName(updatedCategoryDto.getCategoryName());
      originalCategory.setThumbnail(updatedCategoryDto.getThumbnail());
      originalCategory.setPlaylists(updatedCategoryDto.getPlaylists());

      Category updatedCategory = this.categoryRepository.save(originalCategory);
      return categoryToDto(updatedCategory);
   }

   // We can also use model mapper instead of the following methods
   public Category dtoToCategory(CategoryDto categoryDto) {
      Category category = this.modelMapper.map(categoryDto, Category.class);
      // Category category = new Category();
      // category.setCategoryName(categoryDto.getCategoryName());
      // category.setThumbnail(categoryDto.getThumbnail());
      // category.setPlaylists(categoryDto.getPlaylists());
      return category;
   }

   public CategoryDto categoryToDto(Category category) {
      CategoryDto categoryDto = this.modelMapper.map(category, CategoryDto.class);
      // CategoryDto categoryDto = new CategoryDto();
      // categoryDto.setCategoryId(category.getCategoryId());
      // categoryDto.setCategoryName(category.getCategoryName());
      // categoryDto.setThumbnail(category.getThumbnail());
      // categoryDto.setPlaylists(category.getPlaylists());
      return categoryDto;
   }

}
