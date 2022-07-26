import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile, User } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }


  signupUser(user: User){
    return this.http.post<User>(`${this.url}/signup/`,user).pipe
    (tap((res)=>{
      console.log(res)
    }))
  }

  login(user: User){
    return this.http.post<User>(`${this.url}/login/`,user).pipe(tap((res)=>{
      console.log(res);
      // localStorage.setItem(res);
      this.setToken(res);
      this.setUser(res);
      this.getCustomer();
      this.getVendor();
    }))
  }

  setToken(token: any): void {
    this.setLocalStorage('accessToken', token.access);
    this.setLocalStorage('refreshToken', token.refresh);
  }
  setUser(user: any):void{
    this.setLocalStorage('userid', user.id);
    this.setLocalStorage('username', user.username);
    this.setLocalStorage('role', user.roles);
  }
  getCustomer(): Observable<Profile> {
    return this.http.get<Profile>(`${this.url}/customer`).pipe(
      map((profile: any) => {
        console.log(profile)
        this.setLocalStorage('customer', profile);
        return profile;
      })
    );
  }
  getVendor(): Observable<Profile> {
    return this.http.get<Profile>(`${this.url}/vendor`).pipe(
      map((profile: any) => {
        console.log(profile)
        this.setLocalStorage('customer', profile);
        return profile;
      })
    );
  }


  setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, value);
    // return this.getLocalStorage(key);
  }
}


// loginUser(account: loginModel){
//   return this.http.post<any>(`${this.url}/login/`,account)
//     .pipe(catchError(this.handleError),tap((res)=>{
//       console.log(res);
//       this.setToken(res);
//       this.setUser(res);
//       this.handleAuth(res);
//       this.users =this.getUser();
//       this.getProfile().subscribe();

//     return this.profile.subscribe((user) => user);
//     }))
// }