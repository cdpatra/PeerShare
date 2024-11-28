package com.peershare.peershare_backend.security;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.peershare.peershare_backend.entities.Student;

public class UserDetailsImpl implements UserDetails {
  private final Student student;

  public UserDetailsImpl(Student student) {
    this.student = student;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.student.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getRole()))
        .collect(Collectors.toList());
  }

  @Override
  public String getPassword() {
    return this.student.getPassword();
  }

  @Override
  public String getUsername() {
    return this.student.getEmail();
  }

}
