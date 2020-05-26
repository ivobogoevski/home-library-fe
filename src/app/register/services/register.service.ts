import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private API_URL = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) { }

  register(body): Observable<any>{
    return this.http.post<any>(`${this.API_URL}/register`, body);
  }
}
