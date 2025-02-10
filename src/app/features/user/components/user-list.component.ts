import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectAllUsers, selectUserError, selectUserLoading, UserState} from '../store/user.selectors';
import {User} from '../../../core/models/user.model';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {filter, Observable, Subject, takeUntil} from 'rxjs';
import {UserActions} from '../store/user.actions';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatSort,
    MatSortModule,
    NgIf,
    AsyncPipe,

  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements AfterViewInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private readonly userStore: Store<UserState> = inject(Store<UserState>);
  private readonly snackBar = inject(MatSnackBar);
  private readonly cd = inject(ChangeDetectorRef);

  loading$?: Observable<boolean>;
  error$?: Observable<string | undefined>;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['fullname', 'email', 'phone', 'role'];
  // todo display fullname & role?

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.loadUsers();

    // todo extract somewhere as common snackbar...
    this.error$ = this.userStore.select(selectUserError);
    this.error$
      .pipe(takeUntil(this.destroy$),
        filter(error => !!error))
      .subscribe(error => {
        this.snackBar.open(`Error: ${error}`, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      });

    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadUsers(): void {
    this.loading$ = this.userStore.select(selectUserLoading);
    this.userStore.dispatch(UserActions.loadUsers());
    this.userStore.select(selectAllUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => {
        this.dataSource.data = users;
        this.dataSource.sort = this.sort;
      });
  }

}
