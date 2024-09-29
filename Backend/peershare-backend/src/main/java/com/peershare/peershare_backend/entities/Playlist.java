package com.peershare.peershare_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity
public class Playlist {

   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   private String playlistId;
   private int noOfLectures;
   private String instructorChannelName;
   private double review;
   private String playlistURL;

   @ManyToOne
   private Category category;

   public Playlist() {
   }

   public Playlist(String playlistId, int noOfLectures, String instructorChannelName, double review, String playlistURL,
         Category category) {
      this.playlistId = playlistId;
      this.noOfLectures = noOfLectures;
      this.instructorChannelName = instructorChannelName;
      this.review = review;
      this.playlistURL = playlistURL;
      this.category = category;
   }

   public String getPlaylistId() {
      return playlistId;
   }

   public void setPlaylistId(String playlistId) {
      this.playlistId = playlistId;
   }

   public int getNoOfLectures() {
      return noOfLectures;
   }

   public void setNoOfLectures(int noOfLectures) {
      this.noOfLectures = noOfLectures;
   }

   public String getInstructorChannelName() {
      return instructorChannelName;
   }

   public void setInstructorChannelName(String instructorChannelName) {
      this.instructorChannelName = instructorChannelName;
   }

   public double getReview() {
      return review;
   }

   public void setReview(double review) {
      this.review = review;
   }

   public String getPlaylistURL() {
      return playlistURL;
   }

   public void setPlaylistURL(String playlistURL) {
      this.playlistURL = playlistURL;
   }

   public Category getCategory() {
      return category;
   }

   public void setCategory(Category category) {
      this.category = category;
   }

   @Override
   public String toString() {
      return "Playlist [playlistId=" + playlistId + ", noOfLectures=" + noOfLectures + ", instructorChannelName="
            + instructorChannelName + ", review=" + review + ", playlistURL=" + playlistURL + ", category=" + category
            + "]";
   }

}
