import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private snackBar: MatSnackBar) { }

  showSuccess(message: string, duration: number = 3000) {
    this.showToast(message, 'success-toast', duration);
  }

  showError(message: string, duration: number = 3000) {
    this.showToast(message, 'error-toast', duration);
  }

  showInfo(message: string, duration: number = 3000) {
    this.showToast(message, 'info-toast', duration);
  }

  private showToast(message: string, panelClass: string, duration: number) {
    const config = new MatSnackBarConfig();
    config.duration = duration;
    config.panelClass = [panelClass];
    this.snackBar.open(message, 'Close', config);
  }
}
