package com.peershare.peershare_backend.services;

import com.peershare.peershare_backend.entities.RefreshToken;

public interface RefreshTokenService {
  public RefreshToken createRefreshToken(String username);

  public RefreshToken verifyRefreshToken(String refreshToken);
}
