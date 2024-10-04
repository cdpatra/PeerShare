package com.peershare.peershare_backend.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
      return new ResponseEntity<>(allStudents, HttpStatus.FOUND);
   }

   // Handler to get a single student by id;
   @GetMapping("/student/{id}")
   public ResponseEntity<StudentDto> getStudentById(@PathVariable String id) {
      StudentDto student = this.studentService.getStudentById(id);
      return new ResponseEntity<>(student, HttpStatus.FOUND);
   }

   // Handler to add a single student;
   @PostMapping("/student")
   public ResponseEntity<StudentDto> addStudent(@RequestBody StudentDto studentDto) {
      StudentDto student = this.studentService.addStudent(studentDto);
      return new ResponseEntity<>(student, HttpStatus.CREATED);
   }

   // Handler to delete single student by its id;
   @DeleteMapping("/student/{id}")
   public ResponseEntity<?> deleteStudentById(@PathVariable String id) {
      this.studentService.deleteStudent(id);
      return new ResponseEntity<>(HttpStatus.OK);
   }

   // Handler to delete all students;
   @DeleteMapping("/student")
   public ResponseEntity<?> deleteAllStudents() {
      this.studentService.deleteAllStudents();
      return new ResponseEntity<>(HttpStatus.OK);
   }

   // Handler to update a single student by its id;
   @PutMapping("/student/{id}")
   public ResponseEntity<StudentDto> updateStudent(@RequestBody StudentDto updatedStudentDto, @PathVariable String id) {
      StudentDto updateStudent = this.studentService.updateStudent(updatedStudentDto, id);
      return new ResponseEntity<>(updateStudent, HttpStatus.OK);
   }
}
