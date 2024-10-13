package com.peershare.peershare_backend.payloads;

import java.util.ArrayList;
import java.util.List;

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
   private List<PlaylistDto> playlistsDtos = new ArrayList<>();
}
