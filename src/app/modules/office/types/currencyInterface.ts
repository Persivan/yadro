export interface currencyInterface {
  value: number;  // значение умножено на 100, чтобы не иметь проблем с цифрами после запятой
  name: string; // название валюты
  diffValue: number;  // разница с прошлым значением
  selected: boolean; // выбрана ли валюта в списке валют
}
