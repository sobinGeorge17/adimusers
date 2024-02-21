import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  // api = 'http://localhost:3000/api/auth/login'
  private endPoint  = 'auth/login'
  api = environment.apiKey


  post(data: object) {
    const url = `${this.api}${this.endPoint}`
    // console.log(url);
    return this.http.post(url, data)
  }
}
