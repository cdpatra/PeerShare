package com.peershare.peershare_backend.controllers;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.peershare.peershare_backend.exceptions.ResourceNotFoundException;
import com.peershare.peershare_backend.payloads.ApiResponse;
import com.peershare.peershare_backend.payloads.NoteCompositePrimaryKeyDto;
import com.peershare.peershare_backend.payloads.NoteDto;
import com.peershare.peershare_backend.services.NoteService;

@RestController
@RequestMapping("/users/note")
public class NoteController {

   @Autowired
   NoteService noteService;

   // Getting a particular note with the help of studentId, playlistId, and the
   // lectureNo;
   @GetMapping("")
   public ResponseEntity<NoteDto> getNoteByCompositePrimaryKey(
         @ModelAttribute NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto) {
      NoteDto noteDto = this.noteService.getNoteByCompositePrimaryKey(noteCompositePrimaryKeyDto);
<<<<<<< HEAD
      return new ResponseEntity<>(noteDto, HttpStatus.FOUND);
=======
      return new ResponseEntity<>(noteDto, HttpStatus.OK);
>>>>>>> 48d436489ef3dc52c732bf4268c34e450dff32b3
   }

   // Getting all the notes of any particular playlist of any particular student;
   @GetMapping("/entire-playlist-notes")
   public ResponseEntity<List<NoteDto>> getAllNotesByStudentIdAndPlaylistId(
         @RequestParam Map<String, String> studentIdAndPlaylistIdMap) {

      String studentId = Optional.ofNullable(studentIdAndPlaylistIdMap.get("studentId"))
            .orElseThrow(() -> new ResourceNotFoundException("Student ID", "key value", "studentId"));

      String playlistId = Optional.ofNullable(studentIdAndPlaylistIdMap.get("playlistId"))
            .orElseThrow(() -> new ResourceNotFoundException("Playlist ID", "key value", "playlistId"));

      List<NoteDto> noteDtos = this.noteService.getAllNotesByStudentIdAndPlaylistId(studentId, playlistId);

<<<<<<< HEAD
      return new ResponseEntity<>(noteDtos, HttpStatus.FOUND);
=======
      return new ResponseEntity<>(noteDtos, HttpStatus.OK);
>>>>>>> 48d436489ef3dc52c732bf4268c34e450dff32b3
   }

   // Deleting any particular note with the help of studentId, playlistId and
   // lectureNo;
   @DeleteMapping("")
   public ResponseEntity<ApiResponse> deleteNoteByCompositePrimaryKey(
         @ModelAttribute NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto) {
      this.noteService.deleteNoteByCompositePrimaryKey(noteCompositePrimaryKeyDto);
      ApiResponse apiResponse= new ApiResponse("Note deleted successfully",true);
      return new ResponseEntity<>(apiResponse,HttpStatus.OK);
   }

   // Deleting the entire notes of any particular playlist of any particular
   // student;
   @DeleteMapping("/entire-playlist-notes")
   public ResponseEntity<ApiResponse> deleteAllNotesByStudentIdAndPlaylistId(
         @RequestParam Map<String, String> studentIdAndPlaylistIdMap) {
      String studentId = Optional.ofNullable(studentIdAndPlaylistIdMap.get("studentId"))
            .orElseThrow(() -> new ResourceNotFoundException("Student ID", "key value", "studentId"));

      String playlistId = Optional.ofNullable(studentIdAndPlaylistIdMap.get("playlistId"))
            .orElseThrow(() -> new ResourceNotFoundException("Playlist ID", "key value", "playlistId"));

      this.noteService.deleteAllNotesByStudentIdAndPlaylistId(studentId, playlistId);
      ApiResponse apiResponse = new ApiResponse("All notes deleted successfully",true);
      return new ResponseEntity<>(apiResponse,HttpStatus.OK);
   }

   // Updating any particular note with the help of studentId, playlistId, and
   // lectureNo;
   @PutMapping("")
   public ResponseEntity<NoteDto> updateNoteByCompositePrimaryKey(
         @ModelAttribute NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto, @RequestBody NoteDto updatedNoteDto) {
      updatedNoteDto = this.noteService.updateNoteByCompositePrimaryKey(noteCompositePrimaryKeyDto, updatedNoteDto);
      return new ResponseEntity<>(updatedNoteDto, HttpStatus.OK);
   }

   @PostMapping("")
   public ResponseEntity<NoteDto> addNoteByCompositePrimaryKey(
         @ModelAttribute NoteCompositePrimaryKeyDto noteCompositePrimaryKeyDto, @RequestBody NoteDto noteDto) {
      noteDto = this.noteService.addNoteByCompositePrimaryKey(noteCompositePrimaryKeyDto, noteDto);
      return new ResponseEntity<>(noteDto, HttpStatus.CREATED);
   }
}
