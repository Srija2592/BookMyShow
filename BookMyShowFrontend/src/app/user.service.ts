import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  update(user:any,id:string):Observable<User>{
    return this.http.put<User>('http://localhost:8080/api/user/update/'+id,user);
  }

  getuser(username:string):Observable<User>{
    return this.http.get<User>('http://localhost:8080/api/user/'+username);
  }
}
