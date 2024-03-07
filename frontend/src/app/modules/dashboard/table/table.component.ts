import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { CommonService } from '../../../services/common/common.service';
import { LogoutDialogComponent } from '../../../components/logout-dialog/logout-dialog.component';
import * as CryptoJS from 'crypto-js';

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;

}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  endpoint = ''
  limit: number = 10
  page: number = 1
  searchitem: string = ''
  totalCount!: number
  searchendpoint: any
  currentPage = 1; // Current page number
  itemsPerPage = 10;
  isAdmin = false
  data: UserData[] = [];
  token = localStorage.getItem('token');
  errorMessage!: string
  role!: any
  localStoragevalue!: any
  constructor(private service: ApiService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog, private commonService: CommonService) { }

  ngOnInit(): void {
    this.checkRole()
    this.fetchData()
    this.commonService.userSubject.subscribe((res: any) => {
      const user = res
      if (user) {
        this.fetchData()
      }
    })
  }
  fetchData() {
    this.service.get(this.endpoint, this.token).subscribe((res: any) => {
      if (res?.status === 'true') {
        this.data = res?.data?.users;
        this.totalCount = res?.data?.totalCount
      } else {
        console.error('Failed to fetch users:', res.message);
      }

    }, (error: HttpErrorResponse) => {
      if (error?.status === 400 || error?.status === 401 || error?.status === 403 ||
        error?.status === 404 || error?.status === 500) {
        this.errorMessage = error.error.data.error.message
      } else {
        this.errorMessage = "an error occured , please try again later"
      }
      console.error('Error fetching users:', error);
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLocaleLowerCase();
    const searchEndpoint = `${this.searchendpoint}/users?limit=${this.limit}&page=${this.page}&search=${filterValue}`
    this.service.get(searchEndpoint, this.token).subscribe((res: any) => {
      this.data = res?.data?.users;
    }, (error) => {
      console.log(error)
    })
  }
  // checkRole
  checkRole() {
    this.localStoragevalue = localStorage.getItem('role')
    const userRole = this.commonService.decryptData(this.localStoragevalue)
    console.log(userRole);
    
    this.isAdmin = userRole === 'admin'
    this.endpoint = this.isAdmin ? 'admin/users' : 'supervisor/users'
    this.searchendpoint = this.isAdmin ? 'admin' : 'supervisor'
  }
  editUser(user: UserData) {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: 'auto',
      data: { user, isEdit: true } // pass user data and isedit flag
    })
  }

  deleteUser(user: UserData) {
    const dialogRef = this.dialog.open(LogoutDialogComponent, {
      width: 'auto',
      data: { message: 'Are you sure you want to delete this user ?', title: 'Delete User', action: 'delete', userId: user.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // If dialog returns true, user was deleted
        this.data = this.data.filter(u => u.id !== user.id);
        this.openSuccessSnackBar('User deleted successfully');
      }
    }, (error) => {
      console.log(error, 'deleteerror');

    });

  }

  pageChanged(event: any) {
    this.currentPage = event
    const searchEndpoint = `${this.searchendpoint}/users?limit=10&page=${this.currentPage}`
    this.service.get(searchEndpoint, this.token).subscribe((res: any) => {
      this.data = res?.data?.users;
    }, (error) => {
      console.log(error);

    })

  }

  openSuccessSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000, // 5 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']
    });
  }
  openErrorSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // 5 seconds
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'] // Optional custom styling
    });
  }




}
