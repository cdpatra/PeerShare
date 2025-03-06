package com.peershare.peershare_backend.exceptions;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter 
public class ResourceNotFoundException extends RuntimeException {
   private String resourceName;
   private String fieldName;
   private Object fieldValue;

   public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
      super(resourceName + " not found with " + fieldName + " : " + fieldValue);
      this.resourceName = resourceName;
      this.fieldName = fieldName;
      this.fieldValue = fieldValue;
   }

}
