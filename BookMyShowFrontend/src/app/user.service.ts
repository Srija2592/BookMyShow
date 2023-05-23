import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  update(user:any){
    return this.http.put('http://localhost:8080/api/user/update',user);
  }

  getuser(username:string){
    return this.http.get('http://localhost:8080/api/user/'+username);
  }
}
