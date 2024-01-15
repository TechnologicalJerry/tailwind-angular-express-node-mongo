import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiUrl = 'http://localhost:5050/user';

  constructor(private httpClient: HttpClient) {}
}
