import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { CreateUserComponent } from '../create-user/create-user.component';

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
export class TableComponent implements AfterViewInit, OnInit {
  endpoint = 'admin/users';
  data: UserData[] = [];
  token = localStorage.getItem('token');
  errorMessage!: string

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'role', 'edit', 'delete'];
  dataSource = new MatTableDataSource<UserData>(this.data);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: ApiService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchData()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchData() {
    this.service.get(this.endpoint, this.token).subscribe((res: any) => {
      if (res?.status === 'true') {
        this.data = res?.data?.users;
        this.dataSource.data = this.data;
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editUser(user: UserData) {
    console.log('Editing user:', user);
    const dialogRef = this.dialog.open(CreateUserComponent,{
      width:'auto',
      data:{user,isEdit:true} // pass user data and isedit flag
    })
  }

  // deleteUser(user: UserData) {
  //   const userId = user?.id
  //   console.log('Deleting user:', user);
  //   if(confirm('Are you sure you want to delete this user')){
  //     this.service.delete(`admin/users/${userId}`,this.token).subscribe((response:any)=>{
  //       // console.log(response);
  //       if(response?.status === 'true'){
  //         this.data = this.data.filter(u => u.id !==userId)
  //         this.dataSource.data = this.data
  //         this.openSuccessSnackBar("user deleted")
  //       }
  //     },(error:HttpErrorResponse)=>{
  //       if (error?.status === 401 || error?.status === 403 || error?.status === 405
  //         || error?.status === 404 ||error?.status === 500) {
  //         this.openErrorSnackBar = error.error.data.error.message
  //       } else {
  //         this.errorMessage = "an error occured , please try again later"
  //       }

  //     })
  //   }

  // }

  deleteUser(user: UserData) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '400px',
      data: { userId: user.id }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // If dialog returns true, user was deleted
        this.data = this.data.filter(u => u.id !== user.id);
        this.dataSource.data = this.data
        this.openSuccessSnackBar('User deleted successfully');
      }
    });

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
