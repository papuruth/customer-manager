import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/models/user.interface';
import { OrdersComponent } from '../orders/orders.component';
import { Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // Form Builder
  addCustomerForm: FormGroup;
  loading = false;
  formData: IUser;

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

  // Orders Component Reference
  @ViewChild(OrdersComponent) orderComponent: OrdersComponent;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private route: Router
  ) { }

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

    this.addCustomerForm = this.fb.group({
      // second arguements are sync validations, async are passed as third arguement(returns promises/observables)
      first_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z]+/)]],
      last_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z]+/)]],
      city: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z]+/)]],
      state: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15),
      Validators.pattern(/^[a-zA-Z]+/)]],
      address: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50),
      Validators.pattern(/^\s*\S+(?:\s+\S+){2}/)]],
      gender: ['', Validators.required]
    });
  }

  sortColumn() {
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
    if (this.showCards) {
      if (value.length > 0 && isNaN(value)) {
        const filteredCustomer = this.usersList.filter(item => {
          const itemToString = JSON.stringify(item).toLowerCase();
          const itemParsed = JSON.parse(itemToString);
          return Object.keys(itemParsed).some(key => value.toLowerCase().includes(itemParsed[key]));
        });
        this.pagedList = filteredCustomer;
      } else {
        this.pagedList = this.usersList.slice(0, 10);
      }
    } else {
      this.listItem.filter = value.trim().toLowerCase();
    }
  }

  viewChanger(event: any) {
    const id = event.target.id;
    if (id === 'cardsView') {
      document.getElementById('addCustomerView').style.color = '';
      document.getElementById('listView').style.color = '';
      document.getElementById(id).style.color = 'black';
      this.showList = false;
      this.addCustomerView = false;
      this.showCards = true;
    }

    if (id === 'listView') {
      document.getElementById('cardsView').style.color = '';
      document.getElementById('addCustomerView').style.color = '';
      document.getElementById(id).style.color = 'black';
      this.showCards = false;
      this.addCustomerView = false;
      this.showList = true;
    }
  }

  addCustomer() {
    document.getElementById('cardsView').style.color = '';
    document.getElementById('listView').style.color = '';
    document.getElementById('addCustomerView').style.color = 'black';
    this.showList = false;
    this.showCards = false;
    this.addCustomerView = true;
  }

  // Convenient getter method for form values
  get fieldValues() {
    return this.addCustomerForm.controls;
  }

  saveCustomer(): void {
    // stop here if form is invalid
    if (this.addCustomerForm.invalid) {
      return;
    }
    this.loading = true;
    const { first_name, last_name, address, city, state, gender } = this.addCustomerForm.value;
    const id = this.usersList.length + 1;
    this.formData = { id, first_name, last_name, address, city, state, gender };
    this.userService.addUser(this.formData).subscribe((response: any) => {
      console.log(response);
      if (response.success) {
        this.addCustomerForm.reset();
        alert('User added successfgully');
        this.usersList.push(this.formData);
        this.length = this.usersList.length;
        console.log(this.usersList);
      }
    },
      (error) => {
        console.log(error);
      }
    );
  }

  navigateToOrder(id: number): void {
    const filteredUser = this.usersList.filter(ele => {
      return ele.id === id;
    });

    this.route.navigate(['orders'], { state: { dataCustomer: filteredUser } });
  }
}
