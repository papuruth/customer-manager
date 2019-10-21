import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  subscription: Subscription;
  user: number;
  announced: boolean;
  confirmed: boolean;

  constructor(private router: Router) {
    this.user = this.router.getCurrentNavigation().extras.state.example;
  }

  ngOnInit() {
    // this.ordersService.users$.subscribe((data) => {
    //   //console.log(data);
    //   this.user = data;
    //   //console.log(this.user);
    // });
  }
}
