import {Name} from './name.model';
import {Role} from './role.model';

export interface User {
  id: number;
  email: string;
  name: Name;
  phone: string;
  role: Role;
}
