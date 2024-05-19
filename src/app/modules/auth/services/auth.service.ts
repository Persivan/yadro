import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, mergeMap, Observable, of, switchMap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {UserPairInterface} from "../types/userPair.interface";
import {Router} from "@angular/router";

// В проде эндпоинты будут отличаться
const CHECK_USERNAME = 'users'
const LOGIN_USER = 'users'
const REGISTER_USER = 'users'
const RESET_PASSWORD = 'users'
const GET_USER_ID = 'users' // Костыль, т.к. json не может использовать в качестве первичного ключа username, нам нужен id

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  /**
   * Вход в учетную запись пользователя, при успешном входе заполняет localStorage информацией о пользователе
   * @param user - пара логин и пароль для входа
   * @returns Observable<boolean> - возвращает true при успешном вхоже, false в случае ошибки или если учетной записи не существует
   */
  login(user: UserPairInterface): Observable<boolean> {
    const fullUrl = environment.apiUrl + LOGIN_USER;
    return this.http.get<any[]>(`${fullUrl}?username=${user.username}&password=${user.password}`)
      .pipe(
        map(users => {
          if (users.length === 1) {
            // Пользователь найден, вход успешен
            localStorage.setItem('currentUser', JSON.stringify(users[0]));
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
  register(user: UserPairInterface): Observable<boolean> {
    const fullUrl = environment.apiUrl + REGISTER_USER;
    // Проверка, занято ли имя пользователя
    return this.isUsernameTaken(user.username).pipe(
      switchMap(usernameTaken => {
        if (usernameTaken) {
          // Имя пользователя уже используется
          return of(false);
        } else {
          // Имя пользователя доступно, приступаем к регистрации
          return this.http.post<any>(fullUrl, user).pipe(
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
  resetPassword(user: UserPairInterface): Observable<boolean> {
    // Т.к. json-server работает с id, а смена пароля должна происходить по username, то напишем немного логики бэка
    // которая достает id по username и уже потом патчит соответвующую учетку
    const fullUrlForGetUserId = environment.apiUrl + GET_USER_ID;
    const fullUrl = environment.apiUrl + RESET_PASSWORD;
    return this.http.get<any[]>(`${fullUrlForGetUserId}?username=${user.username}`).pipe(
      mergeMap(users => {
        if (users.length === 1) {
          const userId = users[0].id;
          return this.http.patch<any>(`${fullUrl}/${userId}`, { password: user.password }).pipe(
            map(response => true),
            catchError(() => of(false))
          );
        } else {
          return of(false);
        }
      }),
      catchError(() => of(false))
    );
  }


  /**
   * Выход из учетной записи пользователя.
   */
  logout(): void {
    // Удаление пользователя из локального хранилища, чтобы выйти из системы.
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('/auth');
  }

  /**
   * Проверяет, занято ли указанное имя пользователя.
   * @param username - имя пользователя для проверки
   * @returns Observable<boolean> - возвращает true, если имя пользователя занято, false в противном случае или при ошибке
   */
  private isUsernameTaken(username: string): Observable<boolean> {
    const fullUrl = environment.apiUrl + CHECK_USERNAME;
    return this.http.get<any[]>(`${fullUrl}?username=${username}`).pipe(
      map(users => users.length > 0),
      catchError(() => {
        // Обработка ошибок
        return of(false);
      })
    );
  }


}
