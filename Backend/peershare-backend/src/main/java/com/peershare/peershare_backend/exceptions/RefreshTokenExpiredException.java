package com.peershare.peershare_backend.exceptions;

public class RefreshTokenExpiredException extends RuntimeException {
  public RefreshTokenExpiredException() {
    super("Refresh Token Expired !");
  }
}
