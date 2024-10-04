package com.peershare.peershare_backend.payloads;

import java.util.List;

import lombok.Data;

@Data
public class StudentDto {
   private String rollNo;
   private String firstName;
   private String lastName;
   private String email;
   private String password;
   private String graduationYear;
   private String collegeName;
   private String profilePhoto;
   private List<String> skills;
   private String description;
}
