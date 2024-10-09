import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { loginResponse } from 'src/app/models/auth';
import { ToasterService } from 'src/app/sharedservice/toaster.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin: boolean = false;
  submitted: boolean = false;
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private sharedAuthService: AuthServiceService,
    private toasterService:ToasterService
  ) {
    this.myForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  // Getter for easy access to form controls
  get f() {
    return this.myForm.controls;
  }

  verify_login(myForm: FormGroup) {
    this.submitted = true;
    if (myForm.valid) {
      this.authService.login(myForm.value).subscribe({
        next: (data: loginResponse) => {
          this.toasterService.showSuccess('Login successful!');
          this.dialogRef.close(); // Close the dialog on successful login
          this.sharedAuthService.setUserId(data.user.id); // Set the user ID in shared service
        },
        error: (err) => {
          console.error('Login failed:', err);
          this.toasterService.showError('Login failed. Please try again.');
          this.invalidLogin = true; // Show error message on login failure
        }
      });
    }
  }

  togglePassword() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    }
  }
}
