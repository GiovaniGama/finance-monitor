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
          const stockData = data?.chart?.result[0]?.indicators?.quote[0]?.open || [];
          return stockData.slice(-30);
        })
    );
  }
}
