import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';
import {FormsModule} from '@angular/forms';
import {Role} from '../../../core/models/role.model';
import {NgForOf, NgIf} from '@angular/common';
import {PermissionService} from '../services/permission.service';
import {RoleService} from '../../../core/services/role.service';

@Component({
  selector: 'app-role-switcher',
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    FormsModule,
    NgForOf,
    NgIf,
  ],
  templateUrl: './role-switcher.component.html',
  styleUrl: './role-switcher.component.css',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleSwitcherComponent implements AfterViewInit {
  readonly permissionService = inject(PermissionService);
  roles: Role[] = [];
  currentUserRole?: Role;
  private readonly cd = inject(ChangeDetectorRef);
  private readonly roleService = inject(RoleService);

  ngAfterViewInit(): void {
    this.roles = this.roleService.getRoles();
    this.currentUserRole = this.roles[0];
    this.cd.detectChanges();
  }

  onCurrentUserRoleChanged(role: Role) {
    this.permissionService.dispatchRoleChanged(role);
  }
}
