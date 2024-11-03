package com.peershare.peershare_backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.peershare.peershare_backend.entities.Student;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.repositories.StudentRepository;


public class CustomUserDetailsService implements UserDetailsService{


  @Autowired
  public StudentRepository studentRepository;

  @Autowired
  public PasswordEncoder passwordEncoder;
  
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Student student = this.studentRepository.findByEmail(username).orElseThrow(()-> new ResourceNotFoundException("Student", "email", username));
    return new UserDetailsImpl(student);
  }

}
