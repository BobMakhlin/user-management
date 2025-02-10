import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {Role} from '../../../core/models/role.model';
import {getRoles} from '../../../core/utils/role-utils';
import {NgForOf} from '@angular/common';
import {PermissionService} from '../services/permission.service';

@Component({
  selector: 'app-role-switcher',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    NgForOf,
  ],
  templateUrl: './role-switcher.component.html',
  styleUrl: './role-switcher.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleSwitcherComponent implements AfterViewInit {
  private readonly cd = inject(ChangeDetectorRef);
  readonly permissionService = inject(PermissionService);

  roles: Role[] = getRoles();// todo role name same util here.. prep names.
  currentUserRole = this.roles[0];

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  onCurrentUserRoleChanged() {
    this.permissionService.dispatchRoleChanged(this.currentUserRole);
  }
}
