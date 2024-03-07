import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonService } from '../../../services/common/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  role!: any
  @ViewChild('sidenav') sidenav!: MatSidenav

  constructor(private commomService: CommonService) { }


  ngOnInit(): void {
    this.decryptRole()

  }

  decryptRole() {
    const encryptedRole = localStorage.getItem('role');
    if (encryptedRole) {
      this.role = this.commomService.decryptData(encryptedRole);
    }
  }

  toggleSidenav() {
    if (this.sidenav.opened) {
      this.sidenav.close();
    } else {
      this.sidenav.open();
    }
  }

}
