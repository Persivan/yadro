export interface currencyInterfaceResponse {
  currencyStart: string;
  currencyEnd: string;
  currencyStartValue: string;   // значение умножено на 100, чтобы не иметь проблем с цифрами после запятой
  currencyEndValue: string;     // значение умножено на 100, чтобы не иметь проблем с цифрами после запятой
}
