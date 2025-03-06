package com.peershare.peershare_backend.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.ApiResponse;
import com.peershare.peershare_backend.payloads.StudentDto;
import com.peershare.peershare_backend.services.StudentService;

@RestController
@RequestMapping("/users")
public class StudentController {

   @Autowired
   StudentService studentService;

   // Handler to get all students
   @GetMapping("/student")
   public ResponseEntity<List<StudentDto>> getAllStudents() {
      List<StudentDto> allStudents = this.studentService.getAllStudents();
      return new ResponseEntity<>(allStudents, HttpStatus.OK);
   }

   // Handler to get a single student by id;
   @GetMapping("/student/{id}")
   public ResponseEntity<StudentDto> getStudentById(@PathVariable String id) {
      StudentDto student = this.studentService.getStudentById(id);
      return new ResponseEntity<>(student, HttpStatus.OK);
   }

   // Handler to add a single student;
   // THIS API IS NOW IN THE AUTH CONTROLLER.
   // @PostMapping("/student")
   // public ResponseEntity<StudentDto> addStudent(@RequestBody StudentDto
   // studentDto) {
   // StudentDto student = this.studentService.addStudent(studentDto);
   // return new ResponseEntity<>(student, HttpStatus.CREATED);
   // }

   // Handler to delete single student by its id;

   // @PreAuthorize("hasRole('ROLE_ADMIN')")
   @DeleteMapping("/student/{id}")
   public ResponseEntity<ApiResponse> deleteStudentById(@PathVariable String id) {
      this.studentService.deleteStudent(id);
      ApiResponse apiResponse = new ApiResponse("Student deleted successfully", true);
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }

   // Handler to delete all students;
   @DeleteMapping("/student")
   public ResponseEntity<ApiResponse> deleteAllStudents() {
      this.studentService.deleteAllStudents();
      ApiResponse apiResponse = new ApiResponse("All students deleted successfully", true);
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }

   // Handler to update a single student by its id;
   @PutMapping("/student/{id}")
   public ResponseEntity<StudentDto> updateStudent(@RequestBody StudentDto updatedStudentDto, @PathVariable String id) {
      StudentDto updateStudent = this.studentService.updateStudent(updatedStudentDto, id);
      return new ResponseEntity<>(updateStudent, HttpStatus.OK);
   }

   // Handler to add playlist to a particular student
   @PutMapping("/student/add-playlist")
   public ResponseEntity<ApiResponse> addPlaylistByStudentIdAndPlaylistId(
         @RequestParam Map<String, String> studentIdAndPlaylistIdMap) {
      String studentId = Optional.ofNullable(studentIdAndPlaylistIdMap.get("studentId"))
            .orElseThrow(() -> new ResourceNotFoundException("Student ID", "key value", "studentId"));
      String playlistId = Optional.ofNullable(studentIdAndPlaylistIdMap.get("playlistId"))
            .orElseThrow(() -> new ResourceNotFoundException("Playlist ID", "key value", "playlistId"));
      this.studentService.addPlaylist(studentId, playlistId);
      ApiResponse apiResponse = new ApiResponse("Playlist added successfully", true);
      return new ResponseEntity<>(apiResponse, HttpStatus.OK);
   }
}
