package com.peershare.peershare_backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.peershare.peershare_backend.entities.RefreshToken;
import com.peershare.peershare_backend.entities.Student;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.JWTRequest;
import com.peershare.peershare_backend.payloads.JWTResponse;
import com.peershare.peershare_backend.payloads.StudentDto;
import com.peershare.peershare_backend.repositories.StudentRepository;
import com.peershare.peershare_backend.security.JWTHelper;
import com.peershare.peershare_backend.security.UserDetailsImpl;
import com.peershare.peershare_backend.services.impl.RefreshTokenServiceImpl;
import com.peershare.peershare_backend.services.impl.StudentServiceImpl;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class AuthController {

  private final int httpOnlyCookieMaxAge = 7 * 24 * 60 * 60; // 7 days

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

  @Autowired
  private RefreshTokenServiceImpl refreshTokenService;

  private void doAuthenticate(String email, String password) {

    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
    try {
      authenticationManager.authenticate(authentication);

    } catch (BadCredentialsException e) {
      throw new BadCredentialsException(" Invalid Username or Password  !!");
    }

  }

  @PostMapping("/login")
  public ResponseEntity<JWTResponse> loginHandler(@RequestBody JWTRequest jwtRequest, HttpServletResponse response) {
    this.doAuthenticate(jwtRequest.getEmail(), jwtRequest.getPassword());
    // JWT token
    UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getEmail());
    String accessToken = this.jwtHelper.generateToken(userDetails);

    Student student = this.studentRepository.findByEmail(userDetails.getUsername())
        .orElseThrow(() -> new ResourceNotFoundException("Student", "Email", userDetails.getUsername()));
    StudentDto studentDto = this.studentServiceImpl.studentToDto(student);

    // Refresh Token
    RefreshToken refreshToken = this.refreshTokenService.createRefreshToken(jwtRequest.getEmail());

    // setting the refresh token in the http-only cookie
    Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken.getRefreshToken());
    refreshTokenCookie.setHttpOnly(true); // prevents javascript access
    refreshTokenCookie.setSecure(true);// send only over HTTPS
    refreshTokenCookie.setPath("/");// cookie accessible across the domain
    refreshTokenCookie.setMaxAge(this.httpOnlyCookieMaxAge);

    // adding the cookie in the response
    response.addCookie(refreshTokenCookie);

    JWTResponse jwtResponse = new JWTResponse(accessToken, studentDto);
    return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
  }

  @PostMapping("/register")
  public ResponseEntity<StudentDto> addStudent(@RequestBody StudentDto studentDto) {
    StudentDto student = this.studentServiceImpl.addStudent(studentDto);
    return new ResponseEntity<>(student, HttpStatus.CREATED);
  }

  @PostMapping("/refresh")
  public ResponseEntity<?> refreshTokenHandler(@CookieValue("refreshToken") String refreshToken) {
    RefreshToken refreshTokenObject = this.refreshTokenService.verifyRefreshToken(refreshToken);
    // if the refresh token is not expired then this line will run otherwise
    // verifyRefreshToken() will throw exception which is already handled;
    Student student = refreshTokenObject.getStudent();
    UserDetailsImpl userDetailsImpl = new UserDetailsImpl(student);

    String newAccessToken = jwtHelper.generateToken(userDetailsImpl);
    StudentDto studentDto = this.studentServiceImpl.studentToDto(student);

    JWTResponse jwtResponse = new JWTResponse(newAccessToken, studentDto);
    return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
  }

  @GetMapping("/logout")
  public ResponseEntity<?> logoutHandler(@CookieValue("refreshToken") String refreshToken) {
    this.refreshTokenService.deleteRefreshToken(refreshToken);
    return new ResponseEntity<>(HttpStatus.OK);
  }
}
