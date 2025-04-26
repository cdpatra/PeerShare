package com.peershare.peershare_backend.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peershare.peershare_backend.entities.Category;
import com.peershare.peershare_backend.entities.Playlist;
import com.peershare.peershare_backend.entities.Student;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.PlaylistDto;
import com.peershare.peershare_backend.repositories.CategoryRepository;
import com.peershare.peershare_backend.repositories.PlaylistRepository;
import com.peershare.peershare_backend.repositories.StudentRepository;
import com.peershare.peershare_backend.services.PlaylistService;

import ch.qos.logback.classic.Logger;

@Service
public class PlaylistServiceImpl implements PlaylistService {

   @Autowired
   CategoryRepository categoryRepository;

   @Autowired
   PlaylistRepository playlistRepository;

   @Autowired
   StudentRepository studentRepository;

   @Autowired
   ModelMapper modelMapper;

   // Add a single playlist;
   @Override
   public PlaylistDto addPlaylist(PlaylistDto playlistDto) {
      Playlist playlist = this.playlistRepository.save(dtoToPlaylist(playlistDto));
      return playlistToDto(playlist);
   }

   // Delete all the playlists;
   @Override
   public void deleteAllPlaylist() {
      this.playlistRepository.deleteAll();
   }

   // Delete playlist by using id
   @Override
   public void deletePlaylistById(String id) {
      this.playlistRepository.deleteById(id);
   }

   // Get all playlists;
   @Override
   public List<PlaylistDto> getAllPlaylist() {
      List<Playlist> playlists = this.playlistRepository.findAll();
      List<PlaylistDto> playlistDtos = playlists.stream().map((playlist) -> playlistToDto(playlist))
            .collect(Collectors.toList());
      return playlistDtos;
   }

   // Get Single playlist by using id;
   @Override
   public PlaylistDto getPlaylistById(String id) {
      Playlist playlist = this.playlistRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Playlist", "id", id));
      return playlistToDto(playlist);
   }

   // Update the playlist
   @Override
   public PlaylistDto updatePlaylist(PlaylistDto updatedPlaylistDto, String id) {
      this.playlistRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Playlist", "id", id));
      Playlist updatedPlaylist = this.playlistRepository.save(dtoToPlaylist(updatedPlaylistDto));
      return playlistToDto(updatedPlaylist);
   }

   private PlaylistDto playlistToDto(Playlist playlist) {
      PlaylistDto playlistDto = this.modelMapper.map(playlist, PlaylistDto.class);
      playlistDto.setCategoryId(playlist.getCategory().getCategoryId());
      playlistDto.setCategoryName(playlist.getCategory().getCategoryName());
      playlistDto.setStudentId(playlist.getStudent().getRollNo());
      return playlistDto;
   }

   private Playlist dtoToPlaylist(PlaylistDto playlistDto) {
      Playlist playlist = this.modelMapper.map(playlistDto, Playlist.class);
      int categoryId = playlistDto.getCategoryId();
      Category category = this.categoryRepository.findById(categoryId)
            .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
      playlist.setCategory(category);
      String studentId=playlistDto.getStudentId();
      Student student =this.studentRepository.findById(studentId)
                      .orElseThrow(() -> new ResourceNotFoundException("student", "id", studentId));
      playlist.setStudent(student);                
      return playlist;
   }
}
