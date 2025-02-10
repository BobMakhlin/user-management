import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {User} from '../models/user.model';
import {getRandomRole} from '../utils/role-utils';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // todo env vars idea
  private readonly apiUrl = 'https://fakestoreapi.com/users';

  constructor(private readonly httpClient: HttpClient) {
  }

  getUsers$(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl).pipe(
      map(users => users.map(user => this.assignRandomRole(user)))
    );
  }

  private assignRandomRole(user: User): User {
    return {...user, role: getRandomRole()}
  }
}
