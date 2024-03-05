import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  api = environment?.baseurl

  // for login 
  // post(data: object, endPoint: string) {
  //   const url = `${this.api}${endPoint}`
  //   // console.log(url);
  //   return this.http.post(url, data)
  // }

  // get method
  get(endpoint: string, token?: any) {
    const url = `${this.api}${endpoint}`
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    )
    return this.http.get(url, { headers: headers })
  }

  // post method
  // post(data: any, endpoint: any, token?: any) {
  //   const url = `${this.api}${endpoint}`
  //   const headers = new HttpHeaders(
  //     {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${token}`
  //     }
  //   )
  //   return this.http.post(url, data, { headers: headers })
  // }

  post(data: any, endpoint: any, token?: any) {
    const url = `${this.api}${endpoint}`
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.post(url, data, { headers: headers })
  }

  // delete method
  delete(endpoint: string, token?: any) {
    const url = `${this.api}${endpoint}`
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    )
    return this.http.delete(url, { headers: headers })
  }

  //put method
  put(endpoint:string,token:any,data:object){
    const url = `${this.api}${endpoint}`
    const headers = new HttpHeaders(
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    )
    return this.http.put(url,data,{headers:headers})
  }

 
  
}
