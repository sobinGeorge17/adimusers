import { Component,EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headsection',
  templateUrl: './headsection.component.html',
  styleUrl: './headsection.component.css'
})
export class HeadsectionComponent {
  @Output() sidenavToggle = new EventEmitter()
  constructor (private router:Router){}

  toggleSidenav(){
    this.sidenavToggle.emit();

  }
  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    this.router.navigate([''])
  }

}
