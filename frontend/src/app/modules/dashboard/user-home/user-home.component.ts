import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ApiService } from '../../../services/api/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { error } from 'console';
import { HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit {
  endpoint = 'users/me'
  profileuploadEndpoint = 'users/me/profile-picture'

  @ViewChild('sidenav') sidenav!: MatSidenav
  role = 'user'
  user: any
  displayEditOption = false
  token = localStorage.getItem('token')
  profileDataForm!: FormGroup
  profileImage: any
  imagePath: any
  editusername:boolean = true


  constructor(private apiservice: ApiService, private fb: FormBuilder, private snackBar :MatSnackBar ) { }


  toggleSidenav() {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }

  } 

  ngOnInit(): void {
    this.getUserData()
  }

  getUserData(){
    this.apiservice.get(this.endpoint, this.token).subscribe((res: any) => {
      this.profileImage = 'http://localhost:3000/' + res?.data?.user?.profilePictureUrl
      this.user = res?.data?.user
      this.profileDataForm = this.fb.group(
        {
          firstName: [{value:this.user.firstName,disabled:true} , [Validators.required],],
          lastName: [this.user.lastName, [Validators.required]]
        }
      )
    }, (error) => {
      console.log(error);
    })

  }

  editForm() {
    this.profileDataForm.get('firstName')?.enable();
    this.displayEditOption = true

  }
  cancelEdit() {

    this.profileDataForm.get('firstName')?.disable();
    // this.profileDataForm.get('lastName')?.disable();
    this.displayEditOption = false
    this.getUserData()
  }


  upLoadProfile(event: any) {
    this.profileImage = event.target.files[0]
    const formData = new FormData()
    formData.append('file', this.profileImage)
    this.apiservice.post(formData, this.profileuploadEndpoint, this.token).subscribe((response: any) => {
      this.imagePath = response?.data?.file?.path
    }, (error) => {
      console.log(error);
    })
  }

  updateForm() {
     
    if (this.profileImage) {
      Object.assign(this.profileDataForm.value, { "profilePictureUrl": this.imagePath })
      const data = this.profileDataForm.value
      this.profileDataForm.get('firstName')?.disable();
      this.apiservice.put(this.endpoint,this.token,data).subscribe((res:any)=>{
        console.log(res);       
        if(res?.status === 'true'){
         
          this.displayEditOption = false
        } 

        if(res?.message === 'user updated successfully'){
        this.openSuccessSnackBar("updated sucessfully")
          setInterval(()=>{
            this.getUserData()
            this.profileDataForm.get('firstName')?.disable();
          },1000)
         
        }
      },(error=>{
        console.log(error);
      }))
    }
  }

  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }



}
