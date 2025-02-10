import {createAction, createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from '../../../core/models/user.model';
import {AddUser} from '../../../core/models/add-user.model';
import {Role} from '../../../core/models/role.model';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Users Loaded Success': props<{ users: User[] }>(),
    'Users Loaded Error': props<{ error: string }>(),
    'Add User': props<{ user: AddUser }>(),
    'User Added Success': props<{ user: User }>(),
  }
});

export const roleChangedAction = createAction('[CURRENT USER] Role Changed',
  props<{ role: Role }>());
