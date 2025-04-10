package com.peershare.peershare_backend.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Category implements Serializable {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private int categoryId;

   @Column(unique = true)
   private String categoryName;
   private String thumbnail;

   @OneToMany(mappedBy = "category", cascade = CascadeType.ALL)
   private List<Playlist> playlists = new ArrayList<>();

   public void setCategoryName(String categoryName) {
      this.categoryName = categoryName.toLowerCase();
   }
}
