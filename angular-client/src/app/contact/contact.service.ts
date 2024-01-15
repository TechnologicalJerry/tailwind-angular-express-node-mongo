import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = 'http://localhost:5050/user';

  constructor(private httpClient: HttpClient) {}

  addUser(user: any): Observable<any> {
    console.log('USERDATA into service:::POST', user);
    return this.httpClient.post(`${this.apiUrl}/saveUserInfo`, user);
  }
}
