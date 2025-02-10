import {createFeatureSelector, createSelector} from '@ngrx/store';
import {User} from '../../../core/models/user.model';

export interface UserState {
  users: User[];
  error?: string;
  loading: boolean;
}

const selectUserState = createFeatureSelector<UserState>('users');
export const selectAllUsers = createSelector(selectUserState, state => state.users);
