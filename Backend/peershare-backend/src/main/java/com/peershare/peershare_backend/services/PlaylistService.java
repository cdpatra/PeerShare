package com.peershare.peershare_backend.services;

import java.util.List;

import com.peershare.peershare_backend.payloads.PlaylistDto;

public interface PlaylistService {
   PlaylistDto getPlaylistById(String id);

   List<PlaylistDto> getAllPlaylist();

   PlaylistDto addPlaylist(PlaylistDto playlistDto);

   public Boolean getPlaylistByPlaylistURL(String playlistURL);

   PlaylistDto updatePlaylist(PlaylistDto updatedPlaylistDto, String id);

   void deletePlaylistById(String id);

   void deleteAllPlaylist();
}
