package com.peershare.peershare_backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.peershare.peershare_backend.payloads.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

   @ExceptionHandler(ResourceNotFoundException.class)
   public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException exception) {
      String message = exception.getMessage();
      ApiResponse apiResponse = new ApiResponse(message, false);
      return new ResponseEntity<>(apiResponse, HttpStatus.NOT_FOUND);
   }

   // JWT exceptions
   @ExceptionHandler(BadCredentialsException.class)
   public ResponseEntity<ApiResponse> badCredentialsExceptionHandler(BadCredentialsException exception) {
      String message = exception.getMessage();
      ApiResponse apiResponse = new ApiResponse(message, false);
      return new ResponseEntity<>(apiResponse, HttpStatus.UNAUTHORIZED);
   }
}
