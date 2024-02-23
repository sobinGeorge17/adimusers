import { Component,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-headsection',
  templateUrl: './headsection.component.html',
  styleUrl: './headsection.component.css'
})
export class HeadsectionComponent {
  @Output() sidenavToggle = new EventEmitter()

  toggleSidenav(){
    this.sidenavToggle.emit();

  }

}
