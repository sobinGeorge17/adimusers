import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  // api = 'http://localhost:3000/api/auth/login'
  // private endPoint  = 'auth/login'
  api = environment?.baseurl

  // for login 
  post(data: object, endPoint: string) {
    const url = `${this.api}${endPoint}`
    // console.log(url);
    return this.http.post(url, data)
  }

  // to create user
  posts(data: object, endpoint: string, token: any) {
    const url = `${this.api}${endpoint}`
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    )
    console.log(headers);
    
    return this.http.post(url, data, { headers: headers })
  }

}
