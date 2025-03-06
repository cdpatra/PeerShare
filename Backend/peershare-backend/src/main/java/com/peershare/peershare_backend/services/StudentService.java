package com.peershare.peershare_backend.services;

import java.util.List;

import com.peershare.peershare_backend.payloads.StudentDto;

public interface StudentService {
   // Get single student by id
   StudentDto getStudentById(String id);

   // Get all students
   List<StudentDto> getAllStudents();

   // Add a single student
   StudentDto addStudent(StudentDto studentDto);

   // Delete student by id
   void deleteStudent(String id);

   // Delete all students
   void deleteAllStudents();

   // Update single student
   StudentDto updateStudent(StudentDto updatedStudentDto, String id);

   // Add playlist
   void addPlaylist(String studentId, String playlistId);
}
