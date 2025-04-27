package com.peershare.peershare_backend.payloads;


import lombok.Data;

@Data
public class PlaylistDto {
   private String playlistId;
   private int noOfLectures;
   private String instructorChannelName;
   private double review;
   private String playlistURL;
   
   // These are not handle by the modal mapper, have to handle explicitly;
   private String studentId;
   // private String categoryName;
   private int categoryId;
}
