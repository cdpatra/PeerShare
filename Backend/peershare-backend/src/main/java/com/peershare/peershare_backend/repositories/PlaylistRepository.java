package com.peershare.peershare_backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peershare.peershare_backend.entities.Playlist;

public interface PlaylistRepository extends JpaRepository<Playlist, String> {
   Optional<Playlist> findByPlaylistURL(String playlistURL);
}
