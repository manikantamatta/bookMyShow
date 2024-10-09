import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { ToasterService } from 'src/app/sharedservice/toaster.service';
import { ErrorResponse } from 'src/app/models/error';
import { loginResponse } from 'src/app/models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userExists: boolean = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private userService: UserService, 
    private dialogRef: MatDialogRef<RegisterComponent>,
    private toasterService: ToasterService,
    private authService: AuthServiceService
  ) { 
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  // Getters for form controls
  get f() { return this.registerForm.controls; }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true });
    } else if (confirmPassword) {
      confirmPassword.setErrors(null);
    }
  }

  togglePassword(id: string) {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.type = input.type === 'password' ? 'text' : 'password';
    }
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).pipe(
        catchError((error) => {
          const errorResponse: ErrorResponse = error.error || { errorCode: 500, msg: 'Unknown error' };
          if (errorResponse.errorCode === 400) {
            this.userExists = true;
            this.toasterService.showError('Email ID is already registered.');
          } else {
            this.errorMessage = errorResponse.msg;
            this.toasterService.showError("Please register Again");
          }
          return of(null); // Return a safe value or empty observable
        })
      ).subscribe((data: loginResponse | null) => {
        if (data) {
          this.toasterService.showSuccess('Registration successful!');
          this.dialogRef.close(); // Close the dialog on success
        }
      });
    } else {
      if (this.f['password'].errors?.['minlength']) {
        this.toasterService.showError('Password must be at least 6 characters long.');
      }
    }
  }
}
