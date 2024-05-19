export interface currencyInterfaceRequest {
  currencyStart: string;
  currencyEnd: string;
  currencyEndValue: number;   // значение умножено на 100, чтобы не иметь проблем с цифрами после запятой
}
