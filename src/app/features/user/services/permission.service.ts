import {map, Observable} from 'rxjs';
import {Role} from '../../../core/models/role.model';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {CurrentUserState, selectCurrentUserRole} from '../store/user.selectors';
import {roleChangedAction} from '../store/user.actions';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private readonly currentUserRole$: Observable<Role>;

  constructor(private readonly store: Store<CurrentUserState>) {
    this.currentUserRole$ = this.store.select(selectCurrentUserRole);
  }

  canReadTable$(): Observable<boolean> {
    return this.currentUserRole$.pipe(map((role) => role == Role.User
      || role == Role.Admin
      || role === Role.SuperAdmin));
  }

  canCreateUser$(): Observable<boolean> {
    return this.currentUserRole$.pipe(map((role) => role == Role.Admin
      || role === Role.SuperAdmin));
  }

  canSetRoleToNewUser$(): Observable<boolean> {
    return this.currentUserRole$.pipe(map((role) => role === Role.SuperAdmin));
  }

  dispatchRoleChanged(role: Role): void {
    this.store.dispatch(roleChangedAction({role}));
  }
}
