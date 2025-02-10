import {AfterViewInit, Component, inject, OnDestroy, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectAllUsers, UserState} from '../store/user.selectors';
import {User} from '../../../core/models/user.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {Subject, takeUntil} from 'rxjs';
import {UserActions} from '../store/user.actions';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatSort,
    MatSortModule,

  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone: true
})
export class UserListComponent implements AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly userStore: Store<UserState> = inject(Store<UserState>);

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['fullname', 'email', 'phone'];

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.userStore.dispatch(UserActions.loadUsers());
    this.userStore.select(selectAllUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        this.dataSource.data = users;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


}
