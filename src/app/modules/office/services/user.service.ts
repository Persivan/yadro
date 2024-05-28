import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class UserService {

  constructor(
    private router: Router
  ) { }


  /**
   * Выход из учетной записи пользователя.
   */
  logout(): void {
    // Удаление пользователя из локального хранилища, чтобы выйти из системы.
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/auth');
  }

}
