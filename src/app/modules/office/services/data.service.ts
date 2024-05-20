import { Injectable } from '@angular/core';
import {catchError, map, Observable, of, switchMap} from "rxjs";
import {UserPairInterface} from "../../auth/types/userPair.interface";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {currencyInterface} from "../types/currencyInterface";

const FETCH_ELEMENTS = 'elements'
const FETCH_PAGINATION_DATA = 'elements'


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  getTableData(): Observable<currencyInterface[]> {
    const fullUrl = environment.apiUrl + FETCH_ELEMENTS;
    return this.http.get<currencyInterface[]>(fullUrl);
  }

  getDataLength(): Observable<number> {
    const fullUrl = environment.apiUrl + FETCH_PAGINATION_DATA;
    return this.http.get<any[]>(fullUrl)
      .pipe(
        map(data => data.length)
      );
  }


}
