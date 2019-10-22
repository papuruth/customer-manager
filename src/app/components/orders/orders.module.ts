import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { OrdersRoute } from './orders.routes';

@NgModule({
  declarations: [OrdersComponent],
  exports: [OrdersComponent],
  imports: [
    RouterModule.forChild(OrdersRoute),
    CommonModule
  ]
})
export class OrdersModule { }
