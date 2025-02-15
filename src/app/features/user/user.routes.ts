import {Routes} from '@angular/router';
import {UserListComponent} from './components/user-list.component';
import {currentUserReducer, userReducer} from './store/user.reducer';
import {provideState} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {UserEffects} from './store/user.effects';

export default [
  {
    path: '', component: UserListComponent,
    providers: [
      provideState({name: 'users', reducer: userReducer}),
      provideState({name: 'currentUser', reducer: currentUserReducer}),
      provideEffects([UserEffects])
    ]
  }
] as Routes;
