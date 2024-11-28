package com.peershare.peershare_backend.entities;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RefreshToken {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  private String refreshToken;

  private Instant expiry;

  @OneToOne
  private Student student;

  public RefreshToken(String refreshToken, Instant expiry, Student student) {
    this.refreshToken = refreshToken;
    this.expiry = expiry;
    this.student = student;
  }
}
