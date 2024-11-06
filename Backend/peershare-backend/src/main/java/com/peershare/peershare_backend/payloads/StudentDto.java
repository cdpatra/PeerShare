package com.peershare.peershare_backend.payloads;

import java.util.ArrayList;
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
   private List<String> skills = new ArrayList<>();
   private String description;

   // This is not handled by the modal mapper, have to handle it explicitly
   private List<PlaylistDto> myPlaylistsDtos=  new ArrayList<>();
}
