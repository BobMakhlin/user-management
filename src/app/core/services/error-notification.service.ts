import {Injectable} from '@angular/core';
import {filter, Observable, Subject, takeUntil} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorNotificationService {
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly snackBar: MatSnackBar) {
  }

  public listenForErrors(errorSelector$: Observable<string | undefined>): void {
    errorSelector$
      .pipe(
        takeUntil(this.destroy$),
        filter((error) => !!error)
      )
      .subscribe((error) => {
        const errorMessage = `Error: ${error}`;
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      });
  }

  public stopListeningForErrors(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
