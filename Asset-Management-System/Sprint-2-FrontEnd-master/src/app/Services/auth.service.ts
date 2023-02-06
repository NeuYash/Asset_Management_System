import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  login(user: User): Observable<User> {
    return this.http.post<User>('https://zuul-api-gateway.herokuapp.com/login', user, this.httpOptions)
  }

  //Add manager
  addManager(manager: User) {
    return this.http.post<User>('https://zuul-api-gateway.herokuapp.com/addManager', manager, this.httpOptions);
  }

  //Get managers
  getManagers(): Observable<User> {
    return this.http.get<User>('https://zuul-api-gateway.herokuapp.com/getManagers', this.httpOptions)
  }

  //Delete manager
  deleteManager(userId: number) {
    return this.http.delete(`https://zuul-api-gateway.herokuapp.com/deleteManager/${userId}`, this.httpOptions)
  }

  //Update manager
  updateManager(manager: User) {
    return this.http.put('https://zuul-api-gateway.herokuapp.com/updateManager', manager, this.httpOptions)
  }
}
