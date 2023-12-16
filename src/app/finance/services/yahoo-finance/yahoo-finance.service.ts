import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class YahooFinanceService {
  private readonly domain = environment.API_YAHOO_FINANCE

  constructor(private http: HttpClient) { }

  getFinanceYahoo(name: string): Observable<any>{
    return this.http.get(`${this.domain}/${name}`)
      .pipe(
        map((data: any) => {
          const timestamps = data?.chart?.result[0]?.timestamp || [];
          const stockData = data?.chart?.result[0]?.indicators?.quote[0]?.open || [];

          const last30Timestamps = timestamps.slice(-30);
          const last30StockData = stockData.slice(-30);
  
          const matchedData = last30Timestamps.map((timestamp: any, index: number) => {
            return {
              timestamp,
              value: last30StockData[index] || 0
            };
          });
  
          return matchedData;
        })
    );
  }
}
