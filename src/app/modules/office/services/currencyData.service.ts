import {Injectable} from '@angular/core';
import {CurrencyExtResponseInterface} from "../types/CurrencyExtResponse.interface";
import {currencyInterface} from "../types/currencyInterface";


@Injectable()
export class CurrencyDataService {

  constructor() {
  }

  /**
   * Конвертация цены из "Сколько можно купить на 1 руб" в "Сколько стоит 1 доллар"
   * @param data
   */
  convertCurrencyValues(data: CurrencyExtResponseInterface): CurrencyExtResponseInterface {
    const updatedData = { ...data };
    Object.keys(data.data).forEach(key => {
      const value = data.data[key].value;
      updatedData.data[key].value = parseInt((1 / value * 100).toFixed(0));
    });
    return updatedData;
  }


  /**
   * Получаем список "поддерживаемых сервисом" валют
   */
  getSupportedCurrencies(): currencyInterface[] {
    return [{name: "USD", value: 0, diffValue: 0, selected: true},
      {name: "EUR", value: 0, diffValue: 0, selected: true},
      {name: "GBP", value: 0, diffValue: 0, selected: true},
      {name: "CNY", value: 0, diffValue: 0, selected: false},
      {name: "JPY", value: 0, diffValue: 0, selected: false},
      {name: "TRY", value: 0, diffValue: 0, selected: false}]
  }
}
