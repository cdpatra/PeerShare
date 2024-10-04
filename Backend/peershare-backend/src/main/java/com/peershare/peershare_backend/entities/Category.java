package com.peershare.peershare_backend.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;
@Data
@Entity
public class Category {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int categoryId;
   private String categoryName;
   private String thumbnail;

   @OneToMany(mappedBy = "category")
   private List<Playlist> playlists;
   
}
