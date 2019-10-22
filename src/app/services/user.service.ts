import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api } from '../config/index';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  getUsersUrl = `${api.nodeBaseUrl}/getusers`;
  saveUserUrl = `${api.nodeBaseUrl}/adduser`;

  constructor(private Http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.Http.get<IUser[]>(this.getUsersUrl);
  }

  addUser(formData: IUser) {
    return this.Http.post<IUser[]>(this.saveUserUrl, formData)
      .pipe(
        map(response => response),
        catchError(err => err.message)
      );
  }
}
