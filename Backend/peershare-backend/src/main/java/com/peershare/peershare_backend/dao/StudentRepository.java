package com.peershare.peershare_backend.dao;

import org.springframework.data.repository.CrudRepository;

import com.peershare.peershare_backend.entities.Student;

public interface  StudentRepository extends CrudRepository<Student, String> {
   
}
