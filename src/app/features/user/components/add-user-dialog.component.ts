import {Component, inject} from '@angular/core';
import {MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {PermissionService} from '../services/permission.service';
import {MatSelectModule} from '@angular/material/select';
import {getRoles} from '../../../core/utils/role-utils';
import {Role} from '../../../core/models/role.model';


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
  styleUrl: './add-user-dialog.component.css'
})
export class AddUserDialogComponent {
  userForm: FormGroup;
  roles: Role[] = getRoles();
  readonly dialogRef = inject(MatDialogRef<AddUserDialogComponent>);
  readonly permissionService = inject(PermissionService);

  constructor(private readonly fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3)]],
      lastname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: [''],
      note: [''],
      // phone: ['', [Validators.required, Validators.]],
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
