package com.peershare.peershare_backend.controllers;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.ApiResponse;
import com.peershare.peershare_backend.services.UpvoteService;

@RestController
@RequestMapping("/upvote")
public class UpvoteController {

  @Autowired
  UpvoteService upvoteService;

  @PostMapping()
  public ResponseEntity<ApiResponse> addCategory(@RequestBody Map<String, String> studentIdAndPlaylistIdMap) {
    String studentId = Optional.ofNullable(studentIdAndPlaylistIdMap.get("studentId"))
        .orElseThrow(() -> new ResourceNotFoundException("Student ID", "key value", "studentId"));
    String playlistId = Optional.ofNullable(studentIdAndPlaylistIdMap.get("playlistId"))
        .orElseThrow(() -> new ResourceNotFoundException("Playlist ID", "key value", "playlistId"));
    this.upvoteService.upvotePlaylist(studentId, playlistId);
    ApiResponse apiResponse = new ApiResponse("voting successful", true);
    return new ResponseEntity<>(apiResponse, HttpStatus.OK);
  }
}
