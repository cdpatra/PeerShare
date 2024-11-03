package com.peershare.peershare_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Roles {
  @Id
  private int roleId;
  private String role;
}
