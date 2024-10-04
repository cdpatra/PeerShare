package com.peershare.peershare_backend.payloads;

import java.util.List;

import com.peershare.peershare_backend.entities.Playlist;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
   private int categoryId;
   private String categoryName;
   private String thumbnail;
   private List<Playlist> playlists;
}
