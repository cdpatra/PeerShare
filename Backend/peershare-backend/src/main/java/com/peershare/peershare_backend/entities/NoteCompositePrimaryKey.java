package com.peershare.peershare_backend.entities;

import java.io.Serializable;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class NoteCompositePrimaryKey implements Serializable {
   @ManyToOne(cascade=CascadeType.ALL)
   private Student student;
   @ManyToOne(cascade=CascadeType.ALL)
   private Playlist playlist;
   private int lectureNo;
}
