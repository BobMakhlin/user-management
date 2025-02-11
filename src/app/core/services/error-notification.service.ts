import {Injectable} from '@angular/core';
import {filter, Observable, tap} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorNotificationService {
  constructor(private readonly snackBar: MatSnackBar) {
  }

  public listenForErrors(errorSelector$: Observable<string | undefined>): Observable<string | undefined> {
    return errorSelector$.pipe(
      filter((error) => !!error),
      tap((error) => {
        this.snackBar.open(`Error: ${error}`, 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        })
      })
    );
  }
}
