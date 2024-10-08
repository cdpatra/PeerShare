package com.peershare.peershare_backend.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "students")
public class Student {

   @Id
   private String rollNo;

   private String firstName;
   private String lastName;
   private String email;
   private String password;
   private String graduationYear;
   private String collegeName;
   private String profilePhoto;
   private List<String> skills;

   @Lob
   private String description;

}
