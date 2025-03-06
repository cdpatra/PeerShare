package com.peershare.peershare_backend.services;

import java.util.List;

import com.peershare.peershare_backend.payloads.NoteCompositePrimaryKeyDto;
import com.peershare.peershare_backend.payloads.NoteDto;

public interface NoteService {
   NoteDto getNoteByCompositePrimaryKey(NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto);

   List<NoteDto> getAllNotesByStudentIdAndPlaylistId(String studentId, String playlistId);

   NoteDto addNoteByCompositePrimaryKey(NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto, NoteDto noteDto);

   void deleteNoteByCompositePrimaryKey(NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto);

   void deleteAllNotesByStudentIdAndPlaylistId(String studentId, String playlistId);

   NoteDto updateNoteByCompositePrimaryKey(NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto,
         NoteDto updatedNoteDto);
}
