package com.peershare.peershare_backend.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.peershare.peershare_backend.entities.Upvote;
import com.peershare.peershare_backend.entities.Student;
import com.peershare.peershare_backend.entities.Playlist;

@Repository
public interface UpvoteRepository extends JpaRepository<Upvote, Integer> {

  // Check if a student already upvoted a playlist
  boolean existsByPlaylistAndStudent(Playlist playlist, Student student);

  // Optional: retrieve upvote if needed
  Optional<Upvote> findByPlaylistAndStudent(Playlist playlist, Student student);

  // Get all upvotes for a specific playlist
  List<Upvote> findByPlaylist(Playlist playlist);

  @Query("SELECT u.student.rollNo FROM Upvote u WHERE u.playlist = :playlist")
  List<String> findRollNosByPlaylist(@Param("playlist") Playlist playlist);

}
