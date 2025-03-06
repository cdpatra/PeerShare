package com.peershare.peershare_backend.payloads;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteCompositePrimaryKeyDto {
   private String studentId;
   private String playlistId;
   private int lectureNo;
}
