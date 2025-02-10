import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // todo env vars idea
  private readonly apiUrl = 'https://fakestoreapi.com/users';

  constructor(private readonly http: HttpClient) {
  }

  getUsers$(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}
