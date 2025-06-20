import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private apiUrl = 'http://localhost:5050/api/users'; // Change to your backend URL

  constructor(private http: HttpClient) { }

  login(userId: string, password: string): Observable<any> {
    console.log('Login attempt in auth service:', { userId, password });
    return this.http.post(`${this.apiUrl}/login`, { userId, password });
  }

  signup(data: any): Observable<any> {
    console.log('Signup data in auth service:', data);
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

}
