package com.peershare.peershare_backend.services.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.peershare.peershare_backend.entities.Category;
import com.peershare.peershare_backend.entities.Playlist;
import com.peershare.peershare_backend.entities.Roles;
import com.peershare.peershare_backend.entities.Student;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.PlaylistDto;
import com.peershare.peershare_backend.payloads.StudentDto;
import com.peershare.peershare_backend.repositories.CategoryRepository;
import com.peershare.peershare_backend.repositories.PlaylistRepository;
import com.peershare.peershare_backend.repositories.RolesRepository;
import com.peershare.peershare_backend.repositories.StudentRepository;
import com.peershare.peershare_backend.services.StudentService;
import com.peershare.peershare_backend.utils.AppConstants;

@Service
public class StudentServiceImpl implements StudentService {

   @Autowired
   StudentRepository studentRepository;

   @Autowired
   PlaylistRepository playlistRepository;

   @Autowired
   CategoryRepository categoryRepository;

   @Autowired
   ModelMapper modelMapper;

   @Autowired
   RolesRepository rolesRepository;

   @Autowired
   PasswordEncoder passwordEncoder;

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
      Student student = dtoToStudent(studentDto);

      // setting the default user role
      Roles role = this.rolesRepository.findById(AppConstants.ROLE_USER_ID)
            .orElseThrow(() -> new ResourceNotFoundException("Role", "Role ID", AppConstants.ROLE_USER_ID));
      student.addRole(role);
      
      // encoding the password
      student.setPassword(this.passwordEncoder.encode(student.getPassword()));

      Student registeredStudent = this.studentRepository.save(student);
      return studentToDto(registeredStudent);
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

   // Add playlist to the student entity;
   @Override
   public void addPlaylist(String studentId, String playlistId) {
      Student student = this.studentRepository.findById(studentId)
            .orElseThrow(() -> new ResourceNotFoundException("Student", "id", studentId));
      Playlist playlist = this.playlistRepository.findById(playlistId)
            .orElseThrow(() -> new ResourceNotFoundException("Playlist", "id", playlistId));
      student.addPlaylist(playlist);
      this.studentRepository.save(student);
   }

   private StudentDto studentToDto(Student student) {
      StudentDto studentDto = this.modelMapper.map(student, StudentDto.class);

      List<PlaylistDto> myPlaylistDtos = new ArrayList<>();

      if (!student.getMyPlaylists().isEmpty()) {
         myPlaylistDtos = student.getMyPlaylists().stream()
               .map((playlist) -> {
                  PlaylistDto playlistDto = modelMapper.map(playlist, PlaylistDto.class);
                  playlistDto.setCategoryId(playlist.getCategory().getCategoryId());
                  playlistDto.setCategoryName(playlist.getCategory().getCategoryName());
                  return playlistDto;
               }).collect(Collectors.toList());
      }

      studentDto.setMyPlaylistsDtos(myPlaylistDtos);
      return studentDto;
   }

   private Student dtoToStudent(StudentDto studentDto) {

      Student student = this.modelMapper.map(studentDto, Student.class);

      List<Playlist> myPlaylists = new ArrayList<>();

      if (!studentDto.getMyPlaylistsDtos().isEmpty()) {
         myPlaylists = studentDto.getMyPlaylistsDtos().stream().map((playlistDto) -> {
            Playlist playlist = this.modelMapper.map(playlistDto, Playlist.class);
            Category category = this.categoryRepository.findById(playlistDto.getCategoryId())
                  .orElseThrow(() -> new ResourceNotFoundException("Category", "id", playlistDto.getCategoryId()));
            playlist.setCategory(category);
            return playlist;
         }).collect(Collectors.toList());
      }

      student.setMyPlaylists(myPlaylists);
      return student;
   }
}