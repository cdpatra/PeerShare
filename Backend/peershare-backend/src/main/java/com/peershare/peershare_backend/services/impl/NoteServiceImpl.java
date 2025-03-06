package com.peershare.peershare_backend.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.peershare.peershare_backend.entities.Note;
import com.peershare.peershare_backend.entities.NoteCompositePrimaryKey;
import com.peershare.peershare_backend.entities.Playlist;
import com.peershare.peershare_backend.entities.Student;
import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.NoteCompositePrimaryKeyDto;
import com.peershare.peershare_backend.payloads.NoteDto;
import com.peershare.peershare_backend.repositories.NoteRepository;
import com.peershare.peershare_backend.repositories.PlaylistRepository;
import com.peershare.peershare_backend.repositories.StudentRepository;
import com.peershare.peershare_backend.services.NoteService;

@Service
public class NoteServiceImpl implements NoteService {

   @Autowired
   NoteRepository noteRepository;

   @Autowired
   StudentRepository studentRepository;

   @Autowired
   PlaylistRepository playlistRepository;

   @Override
   public NoteDto addNoteByCompositePrimaryKey(NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto, NoteDto noteDto) {
      NoteCompositePrimaryKey noteCompositePrimaryKey = DtoToNoteCompositePrimaryKey(noteCompositePrimaryKeyDto);
      Note note = this.noteRepository.save(DtoToNote(noteCompositePrimaryKey, noteDto));
      return NoteToDto(note);
   }

   @Override
   public void deleteAllNotesByStudentIdAndPlaylistId(String studentId, String playlistId) {
      this.noteRepository.deleteAllNotesByStudentIdAndPlaylistId(studentId, playlistId);
   }

   @Override
   public void deleteNoteByCompositePrimaryKey(NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto) {
      NoteCompositePrimaryKey noteCompositePrimaryKey = DtoToNoteCompositePrimaryKey(noteCompositePrimaryKeyDto);
      this.noteRepository.deleteById(noteCompositePrimaryKey);
   }

   @Override
   public List<NoteDto> getAllNotesByStudentIdAndPlaylistId(String studentId, String playlistId) {
      List<Note> notes = this.noteRepository.findByStudentIdAndPlaylistId(studentId, playlistId);
      List<NoteDto> noteDtos = notes.stream().map((note) -> NoteToDto(note)).collect(Collectors.toList());
      return noteDtos;
   }

   @Override
   public NoteDto getNoteByCompositePrimaryKey(NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto) {
      NoteCompositePrimaryKey noteCompositePrimaryKey = DtoToNoteCompositePrimaryKey(noteCompositePrimaryKeyDto);
      Note note = this.noteRepository.findById(noteCompositePrimaryKey)
            .orElseThrow(
                  () -> new ResourceNotFoundException("Note", "Composite Primary Key", noteCompositePrimaryKeyDto));
      return NoteToDto(note);
   }

   @Override
   public NoteDto updateNoteByCompositePrimaryKey(NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto,
         NoteDto updatedNoteDto) {
      NoteCompositePrimaryKey noteCompositePrimaryKey = DtoToNoteCompositePrimaryKey(noteCompositePrimaryKeyDto);
      this.noteRepository.findById(noteCompositePrimaryKey)
            .orElseThrow(
                  () -> new ResourceNotFoundException("Note", "Composite Primary Key", noteCompositePrimaryKeyDto));
      Note updatedNote = this.noteRepository.save(DtoToNote(noteCompositePrimaryKey, updatedNoteDto));
      return NoteToDto(updatedNote);
   }

   private NoteDto NoteToDto(Note note) {
      return new NoteDto(note.getNoteCompositePrimaryKey().getLectureNo(), note.getLectureURL(), note.getNoteContent());
   }

   private Note DtoToNote(NoteCompositePrimaryKey noteCompositePrimaryKey, NoteDto noteDto) {
      return new Note(noteCompositePrimaryKey, noteDto.getLectureURL(), noteDto.getNoteContent());
   }

   private NoteCompositePrimaryKey DtoToNoteCompositePrimaryKey(NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto) {
      Student student = this.studentRepository.findById(noteCompositePrimaryKeyDto.getStudentId()).orElseThrow(
            () -> new ResourceNotFoundException("Student", "id", noteCompositePrimaryKeyDto.getStudentId()));
      Playlist playlist = this.playlistRepository.findById(noteCompositePrimaryKeyDto.getPlaylistId()).orElseThrow(
            () -> new ResourceNotFoundException("Playlist", "id", noteCompositePrimaryKeyDto.getPlaylistId()));

      int lectureNo = noteCompositePrimaryKeyDto.getLectureNo();
      return new NoteCompositePrimaryKey(student, playlist, lectureNo);
   }
}
