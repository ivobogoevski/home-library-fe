import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { IAuthResponse } from '../models/auth-response.model';
import { Observable } from 'rxjs';
import { IAuthRequest } from '../models/auth.model';
import { config } from '../../config';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(private http: HttpClient) {}

  login(body: IAuthRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(`${config.apiUrl}/users/login`, body);
  }

  refreshToken() {
    const body = {
      RefreshToken: localStorage.getItem('refresh_token'),
      UserID: this.getUserId(),
      Email: this.getUserEmail()
    };
    return this.http.post<any>(`${config.apiUrl}/users/refresh`, body).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  getUserId(): string {
    return jwt_decode(localStorage.getItem('token')).UserID;
  }

  getUserEmail(): string {
    return jwt_decode(localStorage.getItem('token')).Email;
  }
}
