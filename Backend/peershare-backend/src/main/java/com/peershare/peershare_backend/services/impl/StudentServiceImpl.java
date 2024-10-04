package com.peershare.peershare_backend.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peershare.peershare_backend.entities.Student;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.StudentDto;
import com.peershare.peershare_backend.repositories.StudentRepository;
import com.peershare.peershare_backend.services.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

   @Autowired
   StudentRepository studentRepository;

   @Autowired
   ModelMapper modelMapper;

   // Getting single student by id
   @Override
   public StudentDto getStudentById(String id) {
      Student student = this.studentRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
      return this.studentToDto(student);
   }

   // Getting all the students
   @Override
   public List<StudentDto> getAllStudents() {
      List<Student> allStudents = this.studentRepository.findAll();
      List<StudentDto> studentDtos = allStudents.stream()
            .map((student) -> studentToDto(student)).collect(Collectors.toList());
      return studentDtos;
   }

   // Creating a single student
   @Override
   public StudentDto addStudent(StudentDto studentDto) {
      Student student = this.studentRepository.save(dtoToStudent(studentDto));
      return studentToDto(student);
   }

   // Deleting single student by id
   @Override
   public void deleteStudent(String id) {
      this.studentRepository.deleteById(id);
   }

   // Deleting all the students
   @Override
   public void deleteAllStudents() {
      this.studentRepository.deleteAll();
   }

   // Update the student
   @Override
   public StudentDto updateStudent(StudentDto updatedStudentDto, String id) {
      this.studentRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Student", "id", id));
      Student updatedStudent = this.studentRepository.save(dtoToStudent(updatedStudentDto));
      return studentToDto(updatedStudent);
   }

   private StudentDto studentToDto(Student student) {
      return this.modelMapper.map(student, StudentDto.class);
   }

   private Student dtoToStudent(StudentDto studentDto) {
      return this.modelMapper.map(studentDto, Student.class);
   }

}
