package com.peershare.peershare_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import com.peershare.peershare_backend.entities.Upvote;

@Repository
public interface UpvoteRepository extends JpaRepository<Upvote, Integer> {

  Optional<Upvote> findByStudentRollNoAndPlaylistPlaylistId(String rollNo, String playlistId);
}
