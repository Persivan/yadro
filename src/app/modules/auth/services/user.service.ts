import {Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {UserAuthInterface} from "../types/userAuthInterface";
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

const CHECK_USERNAME = 'users'

@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
  ) {
  }


  /**
   * Сохраняет инфу о юзере
   * @param user
   */
  setCurrentUser(user: UserAuthInterface): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }


  /**
   * Проверяет, занято ли указанное имя пользователя.
   * @param username - имя пользователя для проверки
   * @returns Observable<boolean> - возвращает true, если имя пользователя занято, false в противном случае или при ошибке
   */
   isUsernameTaken(username: string): Observable<boolean> {
    const fullUrl = environment.apiUrl + CHECK_USERNAME;
    return this.http.get<UserAuthInterface[]>(`${fullUrl}?username=${username}`)
      .pipe(
        map(users => users.length > 0),
        catchError(() => {
          // Обработка ошибок
          return of(false);
        })
      );
  }


  /**
   * Получение инфы о юзере
   * @param username
   */
  getUserIdByUsername(username: string): Observable<number | null> {
    // Т.к. json-server работает с id, а смена пароля должна происходить по username, то напишем немного логики бэка
    // которая достает id по username и уже потом патчит соответвующую учетку
    const fullUrl = environment.apiUrl + CHECK_USERNAME;
    return this.http.get<UserAuthInterface[]>(`${fullUrl}?username=${username}`)
      .pipe(
        map(users => {
          if (users.length === 1) {
            const userId = Number(users[0].id);
            return isNaN(userId) ? null : userId;
          } else {
            return null;
          }
        }),
        catchError(() => of(null))
      );
  }

}
