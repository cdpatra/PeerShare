package com.peershare.peershare_backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.peershare.peershare_backend.entities.Student;

public interface  StudentRepository extends JpaRepository<Student, String> {
   
}
