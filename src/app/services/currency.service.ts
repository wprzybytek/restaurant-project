import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private httpClient: HttpClient) { }

  getExchangeRates(): Observable<any> {
    return this.httpClient.get('https://freecurrencyapi.net/api/v2/latest?apikey=89a7a210-66a4-11ec-9475-97c8bd91a052&base_currency=EUR')
  }
}
