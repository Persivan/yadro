import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DialogService, NotificationTypes} from "../../../../shared/services/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../styles/authForm.scss'],
})
export class RegisterComponent {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.registerForm.valid) {
      this.dialogService.notify('Неверные данные', NotificationTypes.warning)
      return
    }
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      this.dialogService.notify('Пароли не совпадают', NotificationTypes.warning)
      return;
    }

    console.log('Form submitted:', this.registerForm.value);
    this.authService.register(this.registerForm.value)
      .pipe(take(1))
      .subscribe(success => {
        if (success) {
          this.router.navigateByUrl('/auth');
        } else {
          this.dialogService.notify("Ошибка регистрации", NotificationTypes.warning)
        }
      });
  }
}
