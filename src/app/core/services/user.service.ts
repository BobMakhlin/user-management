import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import {User} from '../models/user.model';
import {AddUser} from '../models/add-user.model';
import {RoleService} from './role.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = 'https://fakestoreapi.com/users';

  constructor(private readonly httpClient: HttpClient,
              private readonly roleService: RoleService) {
  }

  getUsers$(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl).pipe(
      map(users => users.map(user => this.assignRandomRole(user)))
    );
  }

  addUser$(user: AddUser): Observable<User> {
    console.log('ADD USER, user: ', user);
    return of(this.toUser(user)).pipe(
      map(user => this.assignRandomRole(user))
    );
  }

  private assignRandomRole(user: User): User {
    if (!user.role) {
      return {...user, role: this.roleService.getRoleForNewUser()}
    }
    return user;
  }

  private toUser(user: AddUser): User {
    return {
      email: user.email,
      phone: user.phone,
      name: {
        firstname: user.firstname,
        lastname: user.lastname
      },
      role: user.role,
    } as User;
  }
}
