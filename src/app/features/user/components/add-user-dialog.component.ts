import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {PermissionService} from '../services/permission.service';
import {MatSelectModule} from '@angular/material/select';
import {Role} from '../../../core/models/role.model';
import {RoleService} from '../../../core/services/role.service';


@Component({
  selector: 'app-add-user-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    NgIf,
    ReactiveFormsModule,
    MatSelectModule,
    NgForOf,
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserDialogComponent implements AfterViewInit {
  userForm: FormGroup;
  roles: Role[] = [];
  readonly dialogRef = inject(MatDialogRef<AddUserDialogComponent>);
  readonly permissionService = inject(PermissionService);
  private readonly roleService = inject(RoleService);
  private readonly cd = inject(ChangeDetectorRef);

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: [''],
      note: [''],
    });
  }

  ngAfterViewInit(): void {
    this.roles = this.roleService.getRoles();
    this.cd.detectChanges();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
