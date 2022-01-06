import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  currency: string = '€'
  USDRatio: number = 1

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('https://freecurrencyapi.net/api/v2/latest?apikey=89a7a210-66a4-11ec-9475-97c8bd91a052&base_currency=EUR').subscribe((data) => {
      this.USDRatio = (data as any).data.USD
    })
  }

  getUSDRatio(): number {
    return this.USDRatio
  }

  getCurrency(): string {
    return this.currency
  }

  changeCurrency(): void {
    if(this.currency == '€') this.currency = '$'
    else this.currency = '€'
  }
}
