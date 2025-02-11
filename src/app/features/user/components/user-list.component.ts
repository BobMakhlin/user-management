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
import {Observable, Subject, takeUntil} from 'rxjs';
import {UserActions} from '../store/user.actions';
import {AsyncPipe, NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import {AddUserDialogComponent} from './add-user-dialog.component';
import {AddUser} from '../../../core/models/add-user.model';
import {RoleSwitcherComponent} from './role-switcher.component';
import {PermissionService} from '../services/permission.service';
import {ErrorNotificationService} from '../../../core/services/error-notification.service';

@Component({
  selector: 'app-user-list',
  imports: [
    MatTableModule,
    MatProgressSpinnerModule,
    MatSort,
    MatSortModule,
    NgIf,
    AsyncPipe,
    MatButton,
    RoleSwitcherComponent,

  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements AfterViewInit, OnDestroy {
  readonly permissionService = inject(PermissionService);
  loading$?: Observable<boolean>;
  error$?: Observable<string | undefined>;
  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['fullname', 'email', 'phone', 'role'];
  @ViewChild(MatSort) sort!: MatSort;
  private readonly destroy$ = new Subject<void>();
  private readonly userStore: Store<UserState> = inject(Store<UserState>);
  private readonly cd = inject(ChangeDetectorRef);
  private readonly dialog = inject(MatDialog);
  private readonly errorNotificationService = inject(ErrorNotificationService);

  ngAfterViewInit(): void {
    this.loadUsers();
    this.error$ = this.userStore.select(selectUserError);
    this.errorNotificationService.listenForErrors(this.error$)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onAddUserClick(): void {
    const dialogRef = this.dialog.open(AddUserDialogComponent);
    dialogRef.afterClosed().subscribe((user: AddUser) => {
      if (user) {
        this.userStore.dispatch(UserActions.addUser({user}));
      }
    });
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
