import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {UserAuthInterface} from "../types/userAuthInterface";
import {UserService} from "./user.service";

// В проде эндпоинты будут отличаться
const LOGIN_USER = 'users'
const REGISTER_USER = 'users'
const RESET_PASSWORD = 'users'

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
  }


  /**
   * Вход в учетную запись пользователя, при успешном входе заполняет localStorage информацией о пользователе
   * @param user - пара логин и пароль для входа
   * @returns Observable<boolean> - возвращает true при успешном вхоже, false в случае ошибки или если учетной записи не существует
   */
  login(user: UserAuthInterface): Observable<boolean> {
    const fullUrl = environment.apiUrl + LOGIN_USER;
    return this.http.get<UserAuthInterface[]>(`${fullUrl}?username=${user.username}&password=${user.password}`)
      .pipe(
        map(users => {
          if (users.length === 1) {
            // Пользователь найден, сохраним его перс. данные
            this.userService.setCurrentUser(users[0])
            return true;
          } else {
            // Пользователь не найден или неверные учетные данные
            return false;
          }
        }),
        catchError(() => {
          // Обработка ошибок
          return of(false);
        })
      );
  }


  /**
   * Регистрация нового пользователя.
   * @param user - объект с данными пользователя для регистрации
   * @returns Observable<boolean> - возвращает true при успешной регистрации, false в случае ошибки или если имя пользователя уже занято
   */
  register(user: UserAuthInterface): Observable<boolean> {
    const fullUrl = environment.apiUrl + REGISTER_USER;
    // Проверка, занято ли имя пользователя
    return this.userService.isUsernameTaken(user.username)
      .pipe(
        switchMap(usernameTaken => {
          if (usernameTaken) {
            // Имя пользователя уже используется
            return of(false);
          } else {
            // Имя пользователя доступно, приступаем к регистрации
            return this.http.post<UserAuthInterface>(fullUrl, user)
              .pipe(
                map(user => {
                  // Предполагая успешную регистрацию, возвращается созданный пользователь.
                  return !!(user && user.id);
                }),
                catchError(() => {
                  // Обработка ошибок
                  return of(false);
                })
              );
          }
        })
      );
  }

  /**
   * Сброс пароля пользователя.
   * @param user - объект с данными пользователя для сброса пароля
   * @returns Observable<boolean> - возвращает true при успешном сбросе пароля, false в случае ошибки или если пользователь не найден
   */
  resetPassword(user: UserAuthInterface): Observable<boolean> {
    // Т.к. json-server работает с id, а смена пароля должна происходить по username, то напишем немного логики бэка
    // которая достает id по username и уже потом патчит соответвующую учетку
    const fullUrl = environment.apiUrl + RESET_PASSWORD;
    return this.userService.getUserIdByUsername(user.username).pipe(
      switchMap(userId => {
        if (userId) {
          return this.http.patch(fullUrl, { password: user.password }).pipe(
            map(() => true),
            catchError(() => of(false))
          );
        } else {
          return of(false);
        }
      })
    );
  }


}
