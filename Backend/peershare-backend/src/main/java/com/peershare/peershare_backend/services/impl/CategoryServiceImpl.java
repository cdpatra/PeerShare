package com.peershare.peershare_backend.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peershare.peershare_backend.entities.Category;
import com.peershare.peershare_backend.entities.Playlist;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.CategoryDto;
import com.peershare.peershare_backend.payloads.PlaylistDto;
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
      this.categoryRepository.deleteById(id);
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
      originalCategory.setPlaylists(playlistDtosToPlaylists(updatedCategoryDto.getPlaylistsDtos()));

      Category updatedCategory = this.categoryRepository.save(originalCategory);
      return categoryToDto(updatedCategory);
   }

   // We can also use model mapper instead of the following methods
   public Category dtoToCategory(CategoryDto categoryDto) {
      Category category = this.modelMapper.map(categoryDto, Category.class);
      List<Playlist> playlists = playlistDtosToPlaylists(categoryDto.getPlaylistsDtos());
      category.setPlaylists(playlists);
      return category;
   }

   public CategoryDto categoryToDto(Category category) {
      CategoryDto categoryDto = this.modelMapper.map(category, CategoryDto.class);
      List<PlaylistDto> playlistDtos = playlistsToPlaylistDtos(category.getPlaylists());
      categoryDto.setPlaylistsDtos(playlistDtos);
      return categoryDto;
   }

   private List<Playlist> playlistDtosToPlaylists(List<PlaylistDto> playlistDtos) {
      if (playlistDtos.isEmpty())
         return new ArrayList<>();
      else
         return playlistDtos.stream().map((playlistDto) -> {
            Playlist playlist = this.modelMapper.map(playlistDtos, Playlist.class);
            Category category = this.categoryRepository.findById(playlistDto.getCategoryId())
                  .orElseThrow(() -> new ResourceNotFoundException("Category", "id", playlistDto.getCategoryId()));
            playlist.setCategory(category);
            return playlist;
         }).collect(Collectors.toList());
   }

   private List<PlaylistDto> playlistsToPlaylistDtos(List<Playlist> playlists) {
      if (playlists.isEmpty())
         return new ArrayList<>();
      else
         return playlists.stream().map((playlist) -> {
            PlaylistDto playlistDto = this.modelMapper.map(playlist, PlaylistDto.class);
            playlistDto.setCategoryId(playlist.getCategory().getCategoryId());
            playlistDto.setCategoryName(playlist.getCategory().getCategoryName());
            return playlistDto;
         }).collect(Collectors.toList());
   }

}
