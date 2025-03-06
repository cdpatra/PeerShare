package com.peershare.peershare_backend.payloads;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoteDto {
   private int lectureNo;
   private String lectureURL;
   private String noteContent;
}
