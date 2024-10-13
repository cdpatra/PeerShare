package com.peershare.peershare_backend.entities;

import java.io.Serializable;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "playlists")
public class Playlist implements Serializable{

   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   @Column(columnDefinition = "VARCHAR(36)")
   private String playlistId;
   private int noOfLectures;
   private String instructorChannelName;
   private double review;
   private String playlistURL;

   @ManyToOne
   private Category category;

}
