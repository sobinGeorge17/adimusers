import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{
  endpoint ='users/me'

  @ViewChild('sidenav') sidenav!:MatSidenav
  role = 'user'
  user:any
  displayEditOption = false
  token = localStorage.getItem('token')

  constructor(private apiservice :ApiService){}
  toggleSidenav(){
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }

  }

  ngOnInit(): void {
    this.apiservice.get(this.endpoint,this.token).subscribe((res:any)=>{
      console.log(res);
      this.user = res?.data?.user
    },(error)=>{
      console.log(error);
    })
  }

  editForm(){
    this.displayEditOption = true

  }
  cancelEdit(){
    this.displayEditOption = false
  }

}
