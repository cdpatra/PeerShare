package com.peershare.peershare_backend.entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
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

   @ElementCollection
   private List<String> skills = new ArrayList<>();

   @Lob
   private String description;

   @ManyToMany(fetch = FetchType.LAZY)
   @JsonManagedReference
   @OrderBy("id ASC") // Add this to maintain consistent ordering
   private Set<Playlist> myPlaylists = new LinkedHashSet<>();

   public void addPlaylist(Playlist playlist) {
      this.myPlaylists.add(playlist);
   }

   public void removePlaylist(Playlist playlist) {
      this.myPlaylists.remove(playlist);
   }
   
   @ManyToMany(fetch = FetchType.EAGER)
   @JoinTable(name = "student_roles", joinColumns = @JoinColumn(name = "student_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
   private Set<Roles> roles = new LinkedHashSet<>();

   public void addRole(Roles role) {
      this.roles.add(role);
   }
}
