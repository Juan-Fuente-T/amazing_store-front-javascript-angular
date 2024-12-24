import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'auth_token';
  private usernameKey = 'auth_username';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>('http://localhost:30030/api/auth/login', { username, password })
      .pipe(
        tap((response: { token: any; }) => {
          if (response && response.token) {
            this.setToken(response.token);
            console.log('Token almacenado:', response.token); // Verifica que se almacene correctamente
            this.setUsername(username);
            this.isLoggedInSubject.next(true);
          }
        })
      );
  }
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    console.log(localStorage.getItem(this.tokenKey));
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  setUsername(username: string): void {
    localStorage.setItem(this.usernameKey, username);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  isLoggedIn(): boolean {
    console.log("this.getToken()", this.getToken());
    console.log("!!this.getToken()", !!this.getToken());
    return !!this.getToken();
  }
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
  }
  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }
}
