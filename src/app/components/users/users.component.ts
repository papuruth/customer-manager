import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent, MatPaginator } from '@angular/material';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList = []; // Main User Array
  pagedList = []; // Cards Items
  listItem: MatTableDataSource<any>; // Table Items
  showCards = true;
  showList = false;
  addCustomerView = false;
  breakpoint = 4;
  // MatPaginator Inputs
  length = 0;
  page: PageEvent;
  pageSize = 10;
  resultLength = 0;

  // Table Heading
  displayedColumns: string[] = ['image', 'first_name', 'last_name', 'address', 'city', 'state', 'orders_total', 'orders_link'];

  // Mat sort
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 800) ? 1 : 4;
    this.userService.getUsers().subscribe(data => {
      this.usersList = data;
      console.log(data);
      this.pagedList = this.usersList.slice(0, 10);
      this.listItem = new MatTableDataSource(this.usersList.slice(0, 5));
      this.length = this.usersList.length;
      this.resultLength = this.usersList.length;
      this.listItem.sort = this.sort;
    });
  }

  sortColumn($event: Sort) {
    this.listItem.sort = this.sort;
  }


  OnPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.pagedList = this.usersList.slice(startIndex, endIndex);
  }

  ListingPageChange(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.length) {
      endIndex = this.length;
    }
    this.listItem = new MatTableDataSource(this.usersList.slice(startIndex, endIndex));
  }

  onResize(event: any) { // to adjust to screen size
    this.breakpoint = (event.target.innerWidth <= 800) ? 1 : 4;
  }

  onKey(event: any) {
    const value = event.target.value;
    console.log(value);
  }

  viewChanger(event: any) {
    const id = event.target.id;
    console.log(id);
    if (id === 'cardsView') {
      this.showList = false;
      this.addCustomerView = false;
      this.showCards = true;
    }

    if (id === 'listView') {
      this.showCards = false;
      this.addCustomerView = false;
      this.showList = true;
    }
  }

  addCustomer(event: any) {
    this.showList = false;
    this.showCards = false;
    this.addCustomerView = true;
  }
}
