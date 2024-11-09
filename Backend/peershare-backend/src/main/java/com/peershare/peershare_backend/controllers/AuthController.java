package com.peershare.peershare_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.peershare.peershare_backend.entities.Student;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.JWTRequest;
import com.peershare.peershare_backend.payloads.JWTResponse;
import com.peershare.peershare_backend.payloads.StudentDto;
import com.peershare.peershare_backend.repositories.StudentRepository;
import com.peershare.peershare_backend.security.JWTHelper;
import com.peershare.peershare_backend.services.impl.StudentServiceImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {

  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JWTHelper jwtHelper;

  @Autowired
  private StudentServiceImpl studentServiceImpl;

  @Autowired
  private StudentRepository studentRepository;

  private void doAuthenticate(String email, String password) {

    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
    try {
      authenticationManager.authenticate(authentication);

    } catch (BadCredentialsException e) {
      throw new BadCredentialsException(" Invalid Username or Password  !!");
    }

  }

  @PostMapping("/login")
  public ResponseEntity<JWTResponse> loginHandler(@RequestBody JWTRequest jwtRequest) {
    this.doAuthenticate(jwtRequest.getEmail(), jwtRequest.getPassword());
    UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getEmail());
    String token = this.jwtHelper.generateToken(userDetails);

    Student student = this.studentRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new ResourceNotFoundException("Student", "Email", userDetails.getUsername()));
    StudentDto studentDto = this.studentServiceImpl.studentToDto(student);

    JWTResponse response = new JWTResponse(token, studentDto);
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @PostMapping("/register")
  public ResponseEntity<StudentDto> addStudent(@RequestBody StudentDto studentDto) {
    StudentDto student = this.studentServiceImpl.addStudent(studentDto);
    return new ResponseEntity<>(student, HttpStatus.CREATED);
  }

}
