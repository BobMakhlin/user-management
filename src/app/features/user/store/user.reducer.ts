import {UserState} from './user.selectors';
import {createReducer, on} from '@ngrx/store';
import {UserActions} from './user.actions';

const initialState = {
  users: [],
  loading: false,
  error: undefined,
} as UserState;

export const userReducer = createReducer(initialState,
  on(UserActions.loadUsers, (state: UserState) => ({...state, loading: true})),
  on(UserActions.usersLoadedSuccess, (state: UserState, {users}) => ({...state, users, loading: false})),
  on(UserActions.usersLoadedError, (state: UserState, {error}) => ({...state, error, loading: false})),
  on(UserActions.userAddedSuccess, (state: UserState, {user}) => ({...state, users: [...state.users, user]})),
);
