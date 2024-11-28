package com.peershare.peershare_backend.services.impl;

import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peershare.peershare_backend.entities.RefreshToken;
import com.peershare.peershare_backend.entities.Student;
import com.peershare.peershare_backend.exceptions.RefreshTokenExpiredException;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.repositories.RefreshTokenRepository;
import com.peershare.peershare_backend.repositories.StudentRepository;
import com.peershare.peershare_backend.services.RefreshTokenService;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

  // private final long refreshTokenValidity = 5 * 60 * 60 * 1000;
  private final long refreshTokenValidity = 40 * 1000;

  @Autowired
  private RefreshTokenRepository refreshTokenRepository;

  @Autowired
  private StudentRepository studentRepository;

  @Override
  public RefreshToken createRefreshToken(String username) {
    Student student = studentRepository.findByEmail(username)
        .orElseThrow(() -> new ResourceNotFoundException("Student", "Username", username));
    RefreshToken refreshToken;
    if (this.refreshTokenRepository.findByStudent(student).isPresent()) {
      refreshToken = this.refreshTokenRepository.findByStudent(student).get();
      refreshToken.setExpiry(Instant.now().plusMillis(refreshTokenValidity));
    } else {
      refreshToken = new RefreshToken(UUID.randomUUID().toString(),
          Instant.now().plusMillis(refreshTokenValidity), student);
    }
    this.refreshTokenRepository.save(refreshToken);
    return refreshToken;
  }

  @Override
  public RefreshToken verifyRefreshToken(String refreshToken) {
    RefreshToken refreshTokenObject = this.refreshTokenRepository.findByRefreshToken(refreshToken)
        .orElseThrow(() -> new ResourceNotFoundException("Refresh Token", "Refresh Token", refreshToken));
    if (refreshTokenObject.getExpiry().compareTo(Instant.now()) < 0) {
      this.refreshTokenRepository.delete(refreshTokenObject);
      throw new RefreshTokenExpiredException();
    }
    return refreshTokenObject;
  }

  public void deleteRefreshToken(String refreshToken) {
    RefreshToken refreshTokenObject = this.refreshTokenRepository.findByRefreshToken(refreshToken)
        .orElseThrow(() -> new ResourceNotFoundException("Refresh Token", "refreshToken value", refreshToken));
    this.refreshTokenRepository.delete(refreshTokenObject);
  }
}
