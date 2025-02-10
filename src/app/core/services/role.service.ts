import {Injectable} from '@angular/core';
import {Role} from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  getRoles(): Role[] {
    return Object.values(Role);
  }

  getRoleForNewUser(): Role {
    const roles = this.getRoles();
    return roles[Math.floor(Math.random() * roles.length)];
  }
}
