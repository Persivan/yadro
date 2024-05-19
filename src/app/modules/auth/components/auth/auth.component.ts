import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService, NotificationTypes} from "../../../../shared/services/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', '../../styles/authForm.scss'],
})
export class AuthComponent {
  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.dialogService.notify("Неверная форма", NotificationTypes.warning)
      return
    }
    console.log('Form submitted:', this.loginForm.value);
    this.authService.login(this.loginForm.value)
      .pipe(take(1))
      .subscribe(success => {
        if (success) {
          console.log('Login successful');
          this.dialogService.notify('Успешный вход', NotificationTypes.success)
          this.router.navigateByUrl('/office');
        } else {
          console.log('Login failed');
          this.dialogService.notify('Неправильный логин или пароль', NotificationTypes.error)
        }
      });
  }
}
