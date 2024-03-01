import { Component, ViewChild, viewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  role = localStorage.getItem('role')

  @ViewChild('sidenav') sidenav!:MatSidenav
  
  toggleSidenav() { 
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

}
