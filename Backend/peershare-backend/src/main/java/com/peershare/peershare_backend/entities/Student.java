package com.peershare.peershare_backend.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "students")
public class Student {

   @Id
   private String rollNo;

   private String firstName;
   private String lastName;
   private String email;
   private String graduationYear;
   private String collegeName;
   private String profilePhoto;
   private List<String> skills;

   @Lob
   private String description;

   public Student() {
   }

   public Student(String rollNo, String firstName, String lastName, String email, String graduationYear,
         String collegeName, String profilePhoto, List<String> skills, String description) {
      this.rollNo = rollNo;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.graduationYear = graduationYear;
      this.collegeName = collegeName;
      this.profilePhoto = profilePhoto;
      this.skills = skills;
      this.description = description;
   }

   public String getRollNo() {
      return rollNo;
   }

   public void setRollNo(String rollNo) {
      this.rollNo = rollNo;
   }

   public String getFirstName() {
      return firstName;
   }

   public void setFirstName(String firstName) {
      this.firstName = firstName;
   }

   public String getLastName() {
      return lastName;
   }

   public void setLastName(String lastName) {
      this.lastName = lastName;
   }

   public String getGraduationYear() {
      return graduationYear;
   }

   public void setGraduationYear(String graduationYear) {
      this.graduationYear = graduationYear;
   }

   public String getCollegeName() {
      return collegeName;
   }

   public void setCollegeName(String collegeName) {
      this.collegeName = collegeName;
   }

   public String getProfilePhoto() {
      return profilePhoto;
   }

   public void setProfilePhoto(String profilePhoto) {
      this.profilePhoto = profilePhoto;
   }

   public List<String> getSkills() {
      return skills;
   }

   public void setSkills(List<String> skills) {
      this.skills = skills;
   }

   public String getDescription() {
      return description;
   }

   public String getEmail() {
      return email;
   }

   public void setEmail(String email) {
      this.email = email;
   }

   public void setDescription(String description) {
      this.description = description;
   }

   @Override
   public String toString() {
      return "Student [rollNo=" + rollNo + ", firstName=" + firstName + ", lastName=" + lastName + ", graduationYear="
            + graduationYear + ", collegeName=" + collegeName + ", profilePhoto=" + profilePhoto + ", skills=" + skills
            + ", description=" + description + "]";
   }

}
