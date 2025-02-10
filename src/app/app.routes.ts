import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: 'users', loadChildren: () => import('./features/user/user.routes').then(m => m.default)},
  {path: '', redirectTo: '/users', pathMatch: 'full'}
];
