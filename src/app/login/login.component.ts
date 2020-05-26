import { NotificationService } from '../shared/services/notification.service';
import { AuthenticationService } from './services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IAuthRequest } from './models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  checkEmail = new RegExp('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
  displaySpinner = false;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(this.checkEmail),
      ]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.displaySpinner = true;
    const body: IAuthRequest = {
      Email: this.loginForm.controls.email.value,
      Password: this.loginForm.controls.password.value,
    };

    this.authService.login(body).subscribe(
      (res) => {
        this.displaySpinner = false;
        localStorage.setItem('token', res.token);
        localStorage.setItem('refresh_token', res.refreshToken);
        this.router.navigate(['/books']);
      },
      (error) => {
        this.displaySpinner = false;
        this.notificationService.showError(error.error.message);
      }
    );
  }
}
