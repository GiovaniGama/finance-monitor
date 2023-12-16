import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinanceApiAlphavantageService {
  private readonly domain = environment.API_ALPHAVANTAGE

  constructor(private http: HttpClient) {
  }

  getNameFincanceActions() {
    return this.http.get(this.domain, { responseType: 'text' }).pipe(
      map(data => this.csvJSON(data))
    );
  }

  private csvJSON(csv: string): any {
    const lines = csv.split('\n');
    const result = [];
    const headers = lines[0].split(',');

    for (let i = 1; i < lines.length; i++) {
      const obj: { [key: string]: string } = {};
      const currentLine = lines[i].split(',');

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentLine[j];
      }

      result.push(obj);
    }

    return result;
  }
}
