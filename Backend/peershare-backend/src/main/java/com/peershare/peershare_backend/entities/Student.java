package com.peershare.peershare_backend.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "students")
public class Student implements Serializable {

   @Id
   private String rollNo;

   private String firstName;
   private String lastName;

   @Column(unique = true)
   private String email;
   private String password;

   private String graduationYear;
   private String collegeName;
   private String profilePhoto;
   private List<String> skills = new ArrayList<>();

   @Lob
   private String description;

   @ManyToMany(cascade = CascadeType.ALL)
   private List<Playlist> myPlaylists = new ArrayList<>();

   public void addPlaylist(Playlist playlist) {
      this.myPlaylists.add(playlist);
   }

   @ManyToMany(cascade=CascadeType.ALL,fetch=FetchType.EAGER)
   private Set<Roles> roles = new HashSet<>();

   public void addRole(Roles role){
      this.roles.add(role);
   }
}
