import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../../../services/api/api.service';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private service: ApiService) { }

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
    // Handle edit logic here
    console.log('Editing user:', user);
  }

  deleteUser(user: UserData) {
    // Handle delete logic here
    console.log('Deleting user:', user);
  }
}
