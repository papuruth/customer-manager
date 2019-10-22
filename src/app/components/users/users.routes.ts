import { Route } from '@angular/router';
import { UsersComponent } from './users.component';

export const UsersRoute: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersComponent
  }
];
