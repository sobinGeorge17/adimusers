import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  
  userSubject = new BehaviorSubject<boolean>(false)
  constructor() { }

  encryptData(data: any): string {
    return CryptoJS.AES.encrypt(JSON.stringify(data),environment.encryptkey).toString();
  }

  decryptData(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, environment.encryptkey);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

}
