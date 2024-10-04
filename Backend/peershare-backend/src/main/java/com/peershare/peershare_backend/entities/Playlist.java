package com.peershare.peershare_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
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

}
