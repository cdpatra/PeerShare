package com.peershare.peershare_backend.dao;

import org.springframework.data.repository.CrudRepository;

import com.peershare.peershare_backend.entities.Playlist;

public interface PlaylistRepository extends CrudRepository<Playlist, String> {
   
}
