import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {environment} from "../../../../environments/environment";
import {CurrencyExtResponseInterface} from "../types/CurrencyExtResponse.interface";
import {AccountQuotas} from "../types/accountQuotas.interface";
import {currencyInterface} from "../types/currencyInterface";

const CONVERT_CURRENCY = 'v3/latest'
const GET_STATUS = 'v3/status'

@Injectable()
export class CurrencyExtService {

  constructor(
    private http: HttpClient,
  ) {
  }


  /**
   * Получение информации о расходах
   */
  getStatus(): Observable<AccountQuotas> {
    // https://api.currencyapi.com/v3/status?apikey=cur_live_u360xIOrhC6beqWgcQbLA4RVsHM62ntwH1lsG9xR
    // return of({
    //   "account_id": 318480146803855360,
    //   "quotas": {
    //     "month": {
    //       "total": 300,
    //       "used": 4,
    //       "remaining": 296
    //     },
    //     "grace": {
    //       "total": 0,
    //       "used": 0,
    //       "remaining": 0
    //     }
    //   }
    // })

    const fullUrl = environment.currencyApiExtUrl + `${GET_STATUS}?apikey=${environment.currencyApiExtToken}`;
    return this.http.get<AccountQuotas>(fullUrl);
  }

  /**
   * Получение цен на указанный список валют
   * @param currencies список валют для конвертации
   * @param baseCurrency валюта из которой конвертировать
   */
  getCurrencies(currencies: string[], baseCurrency: string = 'RUB'): Observable<CurrencyExtResponseInterface> {
    // return of({
    //   "meta": {
    //     "last_updated_at": "2024-05-27T23:59:59Z"
    //   },
    //   "data": {
    //     "GBP": {
    //       "code": "GBP",
    //       "value": 0.0154094338
    //     },
    //     "EUR": {
    //       "code": "EUR",
    //       "value": 0.0104083396
    //     },
    //     "USD": {
    //       "code": "USD",
    //       "value": 0.0113039503
    //     }
    //   }
    // }).pipe(
    //   map((data: CurrencyExtResponseInterface) => {
    //     console.log(data);
    //     const updatedData = { ...data };
    //     Object.keys(data.data).forEach(key => {
    //       const value = data.data[key].value;
    //       updatedData.data[key].value = parseInt((1 / value * 100).toFixed(0));
    //     });
    //     return updatedData;
    //   })
    // )


    const currenciesParam = currencies.join('%2C');
    const fullUrl = environment.currencyApiExtUrl + `${CONVERT_CURRENCY}?apikey=${environment.currencyApiExtToken}&currencies=${currenciesParam}&base_currency=${baseCurrency}`;
    return this.http.get<CurrencyExtResponseInterface>(fullUrl);
  }

}
