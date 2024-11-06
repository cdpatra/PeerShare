package com.peershare.peershare_backend.entities;

import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Data
@Entity
public class Roles {
  @Id
  private int roleId;
  private String role;
  
  @ManyToMany(mappedBy = "roles") // Bidirectional mapping
  private Set<Student> students;
}
