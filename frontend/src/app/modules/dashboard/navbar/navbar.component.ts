import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() sidenavToggle = new EventEmitter()

  toggleSidenav(){
    this.sidenavToggle.emit(true);

  }

}
