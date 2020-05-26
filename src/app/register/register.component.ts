import { NotificationService } from '../shared/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './services/register.service';
import { IAuthRequest } from '../login/models/auth.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  checkEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
  displaySpinner = false;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(this.checkEmail),
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.displaySpinner = true;
    const body: IAuthRequest = {
      Email: this.registerForm.controls.email.value,
      Password: this.registerForm.controls.password.value,
    };

    this.registerService.register(body).subscribe(
      (res) => {
        this.displaySpinner = false;
        this.notificationService.showSuccess(
          'Successfuly registered. Now you can log in.'
        );
        this.router.navigateByUrl('/login');
      },
      (error) => {
        this.displaySpinner = false;
        this.notificationService.showError(error.error.message);
      }
    );
  }
}
