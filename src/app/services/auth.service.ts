import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenKey = 'auth-token';
  private userKey = 'username';

  private userLoginSubject  = new BehaviorSubject<string | null>(this.getUsername());
  userLoggedIn$ = this.userLoginSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}
  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  register(registerInfo: { username: string; password: string, role: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registerInfo);
  }

  saveAuthData(token: string, username: string) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, username);
    this.userLoginSubject.next(username);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.userKey);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.userLoginSubject.next(null);
    this.router.navigate(['/login']);
  }
}
