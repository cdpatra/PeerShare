package com.peershare.peershare_backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peershare.peershare_backend.entities.RefreshToken;
import com.peershare.peershare_backend.entities.Student;



public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Integer> {
  Optional<RefreshToken> findByRefreshToken(String refreshToken);
  Optional<RefreshToken> findByStudent(Student student);
  void deleteByRefreshToken(String refreshToken);
}
