package com.peershare.peershare_backend.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peershare.peershare_backend.entities.Playlist;
import com.peershare.peershare_backend.entities.Student;
import com.peershare.peershare_backend.entities.Upvote;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.repositories.PlaylistRepository;
import com.peershare.peershare_backend.repositories.StudentRepository;
import com.peershare.peershare_backend.repositories.UpvoteRepository;
import com.peershare.peershare_backend.services.UpvoteService;

@Service
public class UpvoteServiceImpl implements UpvoteService {

  @Autowired
  private UpvoteRepository upvoteRepository;

  @Autowired
  private StudentRepository studentRepository;

  @Autowired
  private PlaylistRepository playlistRepository;

  @Override
  public void upvotePlaylist(String studentId, String playlistId) {
    // Fetch Student and Playlist from DB
    Student student = studentRepository.findById(studentId)
        .orElseThrow(() -> new ResourceNotFoundException("Student", "rollNo", studentId));
    Playlist playlist = playlistRepository.findById(playlistId)
        .orElseThrow(() -> new ResourceNotFoundException("Playlist", "playlistId", playlistId));

    // Check if Upvote already exists
    boolean exists = upvoteRepository.existsByPlaylistAndStudent(playlist, student);
    if (exists) {
      Upvote optionalUpvote = upvoteRepository.findByPlaylistAndStudent(playlist, student)
          .orElseThrow(() -> new ResourceNotFoundException("Upvote", "upvote", playlistId));
      // If Upvote already exists, delete it
      upvoteRepository.delete(optionalUpvote);
      return; // Exit after deletion to avoid creating a new upvote
    }

    // Create and save new Upvote
    Upvote upvote = new Upvote();
    upvote.setStudent(student);
    upvote.setPlaylist(playlist);
    upvoteRepository.save(upvote);
  }
}
