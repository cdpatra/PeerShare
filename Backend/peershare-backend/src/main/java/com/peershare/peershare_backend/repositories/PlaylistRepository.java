package com.peershare.peershare_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peershare.peershare_backend.entities.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, String> {
   
}
