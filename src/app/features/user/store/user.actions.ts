import {createActionGroup, emptyProps, props} from '@ngrx/store';
import {User} from '../../../core/models/user.model';

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'Load Users': emptyProps(),
    'Users Loaded Success': props<{ users: User[] }>(),
    'Users Loaded Error': props<{ error: string }>(),
  }
});
