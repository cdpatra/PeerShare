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
import com.peershare.peershare_backend.payloads.PlaylistDto;
import com.peershare.peershare_backend.services.PlaylistService;

import lombok.extern.slf4j.Slf4j;


@RestController
@RequestMapping("/users")
@Slf4j
public class PlaylistController {

   @Autowired
   PlaylistService playlistService;

   @GetMapping("/playlist")
   public ResponseEntity<List<PlaylistDto>> getAllPlaylists() {
      List<PlaylistDto> allPlaylist = this.playlistService.getAllPlaylist();
      return new ResponseEntity<>(allPlaylist, HttpStatus.OK);
   }

   @GetMapping("/playlist/{id}")
   public ResponseEntity<PlaylistDto> getPlaylistById(@PathVariable String id) {
      PlaylistDto playlist = this.playlistService.getPlaylistById(id);
      return new ResponseEntity<>(playlist, HttpStatus.OK);
   }



   @PostMapping("/playlist")
   public ResponseEntity<Object> addPlaylist(@RequestBody PlaylistDto playlistDto) {
      // system.out.println("Playlist already exists");
      log.info("Adding a new playlist");
      if(this.playlistService.getPlaylistByPlaylistURL(playlistDto.getPlaylistURL())) {
         return new ResponseEntity<>(new ApiResponse("Playlist already exists", false), HttpStatus.BAD_REQUEST);
      }
      PlaylistDto playlist = this.playlistService.addPlaylist(playlistDto);
      return new ResponseEntity<>(playlist, HttpStatus.CREATED);
   }

   @DeleteMapping("/playlist")
   public ResponseEntity<ApiResponse> deleteAllPlaylists() {
      this.playlistService.deleteAllPlaylist();
      ApiResponse apiResponse = new ApiResponse("All playlists deleted successfully", true);
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }

   @DeleteMapping("/playlist/{id}")
   public ResponseEntity<ApiResponse> deletePlaylistById(@PathVariable String id) {
      this.playlistService.deletePlaylistById(id);
      ApiResponse apiResponse = new ApiResponse("Playlist deleted successfully", true);
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }

   @PutMapping("/playlist/{id}")
   public ResponseEntity<PlaylistDto> updatePlaylist(@RequestBody PlaylistDto playlistDto, @PathVariable String id) {
      PlaylistDto updatedPlaylist = this.playlistService.updatePlaylist(playlistDto, id);
      return new ResponseEntity<>(updatedPlaylist, HttpStatus.OK);
   }
}
