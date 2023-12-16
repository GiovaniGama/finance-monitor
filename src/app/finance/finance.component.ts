import { Component, OnInit } from '@angular/core';
import { FinanceApiAlphavantageService } from './services/finace-api/finance-api-alphavantage.service';
import { FincanceNameActionsInterface } from './interfaces/finance-name-actions.interface';
import { YahooFinanceService } from './services/yahoo-finance/yahoo-finance.service';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {
  stockSymbol = 'PETR4.SA';
  stockData: any;
  financeNames: FincanceNameActionsInterface[] = []
  tableHeader: string[] = ['Dia', 'Data', 'Valor', 'Variação em relação a D-1', 'Variação em relação à primeira data'];
  tableData: any[] = [];

  constructor(
      private financeService: FinanceApiAlphavantageService,
      private financeYahooService: YahooFinanceService
    ){}

  ngOnInit(): void {
    this.financeService.getNameFincanceActions().subscribe(
      symbolName => this.financeNames = symbolName
    )

    this.fetchStockData()
  }


  fetchStockData(){
    this.financeYahooService.getFinanceYahoo(this.stockSymbol)
    .subscribe(
      (data: any) => {
        this.stockData = data || [];
        this.tableData = this.generateTableData();
      })
  }


  formatDate(index: number): string {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - (30 - index));
    return currentDate.toLocaleDateString();
  }

  calculateChangeFromPreviousDay(index: number): string {
    if (index === 0) {
      return '0.00%';
    }

    const today = this.stockData[index] ?? 0;
    const yesterday = this.stockData[index - 1] ?? 0;
    const change = ((today - yesterday) / yesterday) * 100;
    return change.toFixed(2) + '%';
  }

  calculateChangeFromFirstDay(index: number): string {
    const firstDay = this.stockData[0] ?? 0;
    const currentDay = this.stockData[index] ?? 0;
    const change = ((currentDay - firstDay) / firstDay) * 100;
    return change.toFixed(2) + '%';
  }

  calculateDailyChange(): number[] {
    const dailyChanges: number[] = [];
    for (let i = 1; i < this.stockData.length; i++) {
      const today = this.stockData[i];
      const yesterday = this.stockData[i - 1];
      const change = ((today - yesterday) / yesterday) * 100;
      dailyChanges.push(change);
    }
    return dailyChanges;
  }

  calculateTotalChange(): number {
    const firstDay = this.stockData[0] ?? 0;
    const lastDay = this.stockData[this.stockData.length - 1] ?? 0;
    return ((lastDay - firstDay) / firstDay) * 100;
  }

  generateTableData(): any[] {
    const tableRows: any[] = [];
    for (let i = 0; i < this.stockData.length; i++) {
      const formattedValue = this.stockData[i]?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }) || 'R$ 0,00';

      const rowData = {
        Dia: i + 1,
        Data: this.formatDate(i),
        Valor: formattedValue,
        'Variação em relação a D-1': this.calculateChangeFromPreviousDay(i),
        'Variação em relação à primeira data': this.calculateChangeFromFirstDay(i)
      };
      tableRows.push(rowData);
    }
    return tableRows;
  }

  onValueSelected(selectedValue: string) {
    this.stockSymbol = selectedValue
    this.fetchStockData()
  }

}
