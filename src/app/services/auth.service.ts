import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile, User } from '../models/auth';
import { ErrorsService } from './errors.service';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private url = `${environment.apiUrl}`;

  constructor(
    private http: HttpClient, 
    private profileService: ProfileService, 
    private errorService:ErrorsService
    ) { }


  signupUser(user: User){
    return this.http.post<User>(`${this.url}/signup/`,user).pipe
    (catchError(this.errorService.handleError),tap((res)=>{
      this.setToken(res);
      this.setUser(res);
      this.profileService.getCustomer();
      this.profileService.getVendor();
    }))
  }

  login(user: User){
    return this.http.post<User>(`${this.url}/login/`,user).pipe
    (catchError(this.errorService.handleError),tap((res)=>{
      this.setToken(res);
      this.setUser(res);
      this.profileService.getCustomer();
      this.profileService.getVendor();
    }))
  }

  refreshToken(): Observable<any> {
    const token = localStorage.getItem('refreshToken');
    return this.http.post<any>(`${this.url}/token/refresh/`,
      { refresh: token },
      this.httpOptions
    );
  }

  setToken(token: any): void {
    this.setLocalStorage('accessToken', token.access);
    this.setLocalStorage('refreshToken', token.refresh);

    // decode the token to read the user_id and expiration timestamp
    const accessTokenParts = token.access.split('.');
    const refreshTokenParts = token.refresh.split('.');
    const accessToken = JSON.parse(window.atob(accessTokenParts[1]));
    const refreshToken = JSON.parse(window.atob(refreshTokenParts[1]));

    this.setLocalStorage('accessExpiry', new Date(accessToken.exp * 1000));
    this.setLocalStorage('refreshExpiry', new Date(refreshToken.exp * 1000));
  }
  setUser(user: any):void{
    this.setLocalStorage('userid', user.id);
    this.setLocalStorage('username', user.username);
    this.setLocalStorage('role', user.roles);
  }

  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
    return this.getLocalStorage(key);
  }
  removeLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userid');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    return this.getLocalStorage('accessToken');
  }
  getLocalStorage(key: string):any{
    const item = localStorage.getItem(key);
  }
}