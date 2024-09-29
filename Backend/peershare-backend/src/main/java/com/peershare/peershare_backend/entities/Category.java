package com.peershare.peershare_backend.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Category {

   @Id
   @GeneratedValue(strategy = GenerationType.AUTO)
   private int categoryId;
   private String categoryName;
   private String thumbnail;

   @OneToMany(mappedBy = "category")
   private List<Playlist> playlists;

   public Category() {
   }

   public Category(int categoryId, String categoryName, String thumbnail, List<Playlist> playlists) {
      this.categoryId = categoryId;
      this.categoryName = categoryName;
      this.thumbnail = thumbnail;
      this.playlists = playlists;
   }

   public int getCategoryId() {
      return categoryId;
   }

   public void setCategoryId(int categoryId) {
      this.categoryId = categoryId;
   }

   public String getCategoryName() {
      return categoryName;
   }

   public void setCategoryName(String categoryName) {
      this.categoryName = categoryName;
   }

   public String getThumbnail() {
      return thumbnail;
   }

   public void setThumbnail(String thumbnail) {
      this.thumbnail = thumbnail;
   }

   public List<Playlist> getPlaylists() {
      return playlists;
   }

   public void setPlaylists(List<Playlist> playlists) {
      this.playlists = playlists;
   }

   @Override
   public String toString() {
      return "Category [categoryId=" + categoryId + ", categoryName=" + categoryName + ", thumbnail=" + thumbnail
            + ", playlists=" + playlists + "]";
   }

}
