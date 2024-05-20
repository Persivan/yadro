import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {take} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {DialogService, NotificationTypes} from "../../../../shared/services/dialog.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss', '../../styles/authForm.scss'],
})
export class ResetPasswordComponent {
  resetPassForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private dialogService: DialogService,
    private router: Router,
  ) {
    this.resetPassForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (!this.resetPassForm.valid) {
      this.dialogService.notify("Форма некорректна!", NotificationTypes.warning)
      return
    }

    const dialogRef = this.dialogService.confirm(
      'Вы уверены?',
      'Да',
      'Отмена'
    );
    dialogRef.afterClosed().pipe(take(1))
      .subscribe((apply) => {
        if (apply) {
          this.authService.resetPassword(this.resetPassForm.value)
            .pipe(take(1))
            .subscribe(success => {
              if (success) {
                this.router.navigateByUrl('/auth');
              } else {
                this.dialogService.notify("Ошибка смены пароля", NotificationTypes.warning)
              }
            });
        }
      })


  }
}
