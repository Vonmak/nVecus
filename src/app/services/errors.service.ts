import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  handleError(error: HttpErrorResponse){
    console.log(error)
    let errormessage = 'An unknown errror occured'
    if(!error.error){
      return throwError(errormessage)
    }
    if(error.error.non_field_errors){
      errormessage = error.error.non_field_errors[0]
    }
    if(error.error.email){
      errormessage = error.error.email[0]
    }
    if(error.error.username){
      errormessage = error.error.username[0]
    }
    return throwError(errormessage);
  }
}
