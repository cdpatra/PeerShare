package com.peershare.peershare_backend.entities;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Note {

   @EmbeddedId
   private NoteCompositePrimaryKey noteCompositePrimaryKey;
   private String lectureURL;

   @Lob
   private String noteContent;

   
}
