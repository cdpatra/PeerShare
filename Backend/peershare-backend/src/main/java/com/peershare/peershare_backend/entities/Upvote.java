package com.peershare.peershare_backend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "upvote", uniqueConstraints = @UniqueConstraint(columnNames = { "roll_no", "playlist_id" }))
public class Upvote {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;

  @ManyToOne
  @JoinColumn(name = "roll_no", nullable = false)
  private Student student;

  @ManyToOne
  @JoinColumn(name = "playlist_id", nullable = false)
  private Playlist playlist;
}
