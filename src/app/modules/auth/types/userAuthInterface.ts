export interface UserAuthInterface {
  id?: string;        // ID пользователя
  username: string;   // Логин пользователя
  password: string;   // Пароль пользователя
  email?: string;     // Эл. почта, если бы требовалась
}
