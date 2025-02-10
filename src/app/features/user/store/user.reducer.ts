import {CurrentUserState, UserState} from './user.selectors';
import {createReducer, on} from '@ngrx/store';
import {roleChangedAction, UserActions} from './user.actions';
import {Role} from '../../../core/models/role.model';

const userInitState = {
  users: [],
  loading: false,
  error: undefined,
} as UserState;

export const userReducer = createReducer(userInitState,
  on(UserActions.loadUsers, (state: UserState) => ({...state, loading: true})),
  on(UserActions.usersLoadedSuccess, (state: UserState, {users}) => ({...state, users, loading: false})),
  on(UserActions.usersLoadedError, (state: UserState, {error}) => ({...state, error, loading: false})),
  on(UserActions.userAddedSuccess, (state: UserState, {user}) => ({...state, users: [...state.users, user]})),
);

const currentUserInitState = {
  role: Role.User,
} as CurrentUserState;

export const currentUserReducer = createReducer(currentUserInitState,
  on(roleChangedAction, (state: CurrentUserState, {role}) => ({role}))
);

