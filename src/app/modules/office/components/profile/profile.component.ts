import {Component, OnInit} from '@angular/core';
import {UserInterface} from "../../types/User.interface";
import {AuthService} from "../../../auth/services/auth.service";
import {DialogService, NotificationTypes} from "../../../../shared/services/dialog.service";
import {take} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  currentUser!: UserInterface;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(<string>localStorage.getItem('currentUser'));
    this.currentUser.role = 'Пользователь'
  }


  logout() {
    const dialogRef = this.dialogService.confirm(
      'Вы уверены, что хотите выйти?',
      'Да',
      'Отмена'
    );
    dialogRef.afterClosed().pipe(take(1))
      .subscribe((apply) => {
        if (apply) {
          this.authService.logout();
        }
      })
  }

  like() {
    this.dialogService.notify('Мне тоже нравится собачка', NotificationTypes.success)
  }
}
