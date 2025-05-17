package com.peershare.peershare_backend.entities;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "playlists")
public class Playlist implements Serializable{

   @Id
   @GeneratedValue(strategy = GenerationType.UUID)
   @Column(columnDefinition = "VARCHAR(36)")
   private String playlistId;
   private int noOfLectures;
   private String instructorChannelName;

   @Column(unique = true)
   private String playlistURL;

   @ManyToOne
   @JsonBackReference
   private Student student;
   
   @ManyToOne
   private Category category;

}
