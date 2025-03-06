package com.peershare.peershare_backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.peershare.peershare_backend.entities.Note;
import com.peershare.peershare_backend.entities.NoteCompositePrimaryKey;



public interface NoteRepository extends JpaRepository<Note, NoteCompositePrimaryKey> {
      @Query("SELECT n FROM Note n WHERE n.noteCompositePrimaryKey.student.rollNo = :studentId AND n.noteCompositePrimaryKey.playlist.playlistId = :playlistId")
      List<Note> findByStudentIdAndPlaylistId(@Param("studentId") String studentId,
                  @Param("playlistId") String playlistId);

      @Modifying // This annotation is used to indicate that the query is not a SELECT query but
                 // an update or delete operation.
      @Transactional // Ensures that the operation is performed within a transaction. For DELETE
                     // operations, transactions are required.
      @Query("DELETE FROM Note n WHERE n.noteCompositePrimaryKey.student.rollNo = :studentId AND n.noteCompositePrimaryKey.playlist.playlistId = :playlistId")
      void deleteAllNotesByStudentIdAndPlaylistId(@Param("studentId") String studentId,
                  @Param("playlistId") String playlistId);
}
