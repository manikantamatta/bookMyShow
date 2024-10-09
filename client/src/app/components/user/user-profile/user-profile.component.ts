import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { AuthServiceService } from 'src/app/sharedservice/auth-service.service';
import { formattedDob } from 'src/app/utils/util';
import { Subscription } from 'rxjs';
import { ToasterService } from 'src/app/sharedservice/toaster.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  currUser: User = new User('', '', '');
  userId: string |null= '';
  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthServiceService,
    private toasterService: ToasterService
  ) {
    this.profileForm = this.fb.group({
      username: [{ value: '', disabled: true }, Validators.required],
      mobile_no: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: this.fb.group({
        houseno: [''],
        street: [''],
        city: [''],
        state: [''],
        pincode: ['', [Validators.pattern('^[0-9]{6}$')]]
      }),
      personal_details: this.fb.group({
        name: ['', Validators.required],
        dob: ['', Validators.required]
      })
    });
  }

  ngOnInit(): void {
    // Subscribe to user ID observable
    this.subscriptions.add(this.authService.getUserId().subscribe((response) => {
      this.userId = response;
      this.fetchUser();
    }));
  }

  fetchUser(): void {
    // Fetch user details
    this.subscriptions.add(this.userService.getUserById(this.userId||'').subscribe(user => {
      this.currUser = user;
      this.populateForm();
    }));
  }

  populateForm(): void {
    // Populate the form with user data
    this.profileForm.setValue({
      username: this.currUser.username,
      mobile_no: this.currUser.mobile_no,
      address: {
        houseno: this.currUser.address.houseno,
        street: this.currUser.address.street,
        city: this.currUser.address.city,
        state: this.currUser.address.state,
        pincode: this.currUser.address.pincode
      },
      personal_details: {
        name: this.currUser.personal_details.name,
        dob: formattedDob(this.currUser.personal_details.dob)
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser = {
        ...this.currUser,
        ...this.profileForm.value,
        address: { ...this.profileForm.value.address },
        personal_details: { ...this.profileForm.value.personal_details }
      };
      this.subscriptions.add(this.userService.updateUserById(this.userId||'', updatedUser).subscribe(response => {
        if (response.status === 200) {
          this.toasterService.showSuccess('User Successfull Updated');
        } else {
          this.toasterService.showError('Failed to update user');
        }
      }, error => {
        this.toasterService.showError('An error occurred while updating the user.');
      }));
    }
  }

  onCancel(): void {
    // Reset the form to the current user details
    this.profileForm.reset({
      username: this.currUser.username,
      mobile_no: this.currUser.mobile_no,
      address: {
        houseno: this.currUser.address.houseno,
        street: this.currUser.address.street,
        city: this.currUser.address.city,
        state: this.currUser.address.state,
        pincode: this.currUser.address.pincode
      },
      personal_details: {
        name: this.currUser.personal_details.name,
        dob: formattedDob(this.currUser.personal_details.dob)
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
