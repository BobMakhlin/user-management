import {Role} from './role.model';

export interface AddUser {
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  role?: Role;
  note?: string;
}
