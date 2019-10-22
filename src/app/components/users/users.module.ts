import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { UsersRoute } from './users.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule, MatCardModule, MatButtonModule, MatSortModule, MatTableModule, MatPaginatorModule } from '@angular/material';

@NgModule({
  declarations: [UsersComponent],
  exports: [UsersComponent],
  imports: [
    RouterModule.forChild(UsersRoute),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule
  ]
})
export class UsersModule { }
