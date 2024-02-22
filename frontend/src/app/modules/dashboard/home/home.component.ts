import { Component, ViewChild, viewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  @ViewChild('sidenav') sidenav!:MatSidenav
  
  toggleSidenav(opened: boolean) { 
    if (opened) {
      this.sidenav.open();
    } else {
      this.sidenav.close();
    }
  }

}
