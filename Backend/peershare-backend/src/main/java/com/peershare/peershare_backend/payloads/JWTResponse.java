package com.peershare.peershare_backend.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JWTResponse {
  private String JWTAccessToken;
  private StudentDto student;
}
