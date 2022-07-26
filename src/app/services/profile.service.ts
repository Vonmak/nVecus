import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile, User } from '../models/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private url = `${environment.apiUrl}`;

  // user: Profile;


  constructor(private http: HttpClient) { }

  upDateCustomer(profile:any ): Observable<any>{
    return this.http.patch(`${this.url}/customer/`,profile);
  }
  upDateVendor(profile:any ): Observable<any>{
    return this.http.patch(`${this.url}/vendor/`,profile);
  }
  getCustomer(): Observable<Profile>{
    return this.http.get<Profile>(`${this.url}/customer/`).pipe(
      map((profile: any) => {
        console.log(profile)
        localStorage.setItem('customer', profile);
        return profile;
      })
    );
  }
  getVendor(): Observable<Profile>{
    return this.http.get<Profile>(`${this.url}/vendor/`).pipe(
      map((profile: any) => {
        console.log(profile)
        localStorage.setItem('customer', profile);
        return profile;
      })
    );
  }
  // GetData(): Observable<Item> {
  //   return this.http.get<Item>(`${this.url}/items`);
  // }
}
