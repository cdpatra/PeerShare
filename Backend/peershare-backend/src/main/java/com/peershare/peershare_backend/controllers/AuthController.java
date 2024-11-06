package com.peershare.peershare_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.peershare.peershare_backend.payloads.JWTRequest;
import com.peershare.peershare_backend.payloads.JWTResponse;
import com.peershare.peershare_backend.payloads.StudentDto;
import com.peershare.peershare_backend.security.JWTHelper;
import com.peershare.peershare_backend.services.StudentService;

@RestController
public class AuthController {

  @Autowired
  private UserDetailsService userDetailsService;

  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private JWTHelper jwtHelper;

  @Autowired
  private StudentService studentService;

  private void doAuthenticate(String email, String password) {

    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
    try {
      authenticationManager.authenticate(authentication);

    } catch (BadCredentialsException e) {
      throw new BadCredentialsException(" Invalid Username or Password  !!");
    }

  }

  @GetMapping("/auth/login")
  public ResponseEntity<JWTResponse> loginHandler(@RequestBody JWTRequest jwtRequest) {
    this.doAuthenticate(jwtRequest.getEmail(), jwtRequest.getPassword());
    UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getEmail());
    String token = this.jwtHelper.generateToken(userDetails);

    JWTResponse response = new JWTResponse(token, userDetails.getUsername());
    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  @PostMapping("/auth/register")
  public ResponseEntity<StudentDto> addStudent(@RequestBody StudentDto studentDto) {
    StudentDto student = this.studentService.addStudent(studentDto);
    return new ResponseEntity<>(student, HttpStatus.CREATED);
  }

}
