import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {interval, Observable, of, switchMap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {currencyInterfaceRequest} from "../types/currencyInterfaceRequest";
import {currencyInterfaceResponse} from "../types/currencyInterfaceResponse";
import {currencyInterface} from "../types/currencyInterface";

const CONVERT_CURRENCY = 'convertCurrency'

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(
    private http: HttpClient,
  ) { }

  getStartValues(): Observable<currencyInterface[]> {
    return of([{name: "usd", value: 0,  diffValue: 0, selected: true},
      {name: "eur", value: 0, diffValue: 0, selected: true},
      {name: "gbr", value: 0, diffValue: 0, selected: true},
      {name: "cny", value: 0, diffValue: 0, selected: false},
      {name: "jpy", value: 0, diffValue: 0, selected: false},
      {name: "try", value: 0, diffValue: 0, selected: false}]
    )
  }

  convertCurrency(data: currencyInterfaceRequest): Observable<currencyInterfaceResponse> {
    const fullUrl = environment.currencyApiUrl + CONVERT_CURRENCY;
    return this.http.post<currencyInterfaceResponse>(fullUrl, data);
  }
}
