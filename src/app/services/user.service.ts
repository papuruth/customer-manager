import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {api} from '../config/index';
import { Observable } from 'rxjs';
import { IUser } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersUrl = `${api.nodeBaseUrl}/getusers`;

  constructor(private Http: HttpClient) { }

  getUsers(): Observable<IUser[]> {
    return this.Http.get<IUser[]>(this.usersUrl);
  }
}
