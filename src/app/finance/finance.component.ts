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
  lineChartData: any[] = [];
  lineChartLabels: any[] = [];
  lineChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false
  };
  lineChartLegend = true;

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
        this.prepareChartData();
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

    const today = this.stockData[index].value ?? 0;
    const yesterday = this.stockData[index - 1].value ?? 0;
    if(today === 0 && yesterday === 0){
      const change = 0;
      return change.toFixed(2) + '%';
    }
    const change = ((today - yesterday) / yesterday) * 100;
    return change.toFixed(2) + '%';
  }

  calculateChangeFromFirstDay(index: number): string {
    if (index === 0) {
      return '0.00%';
    }

    const firstDay = this.stockData[0].value ?? 0;
    const currentDay = this.stockData[index].value ?? 0;

    if(firstDay === 0 && currentDay === 0){
      return '0.00%';
    }

    const change = ((currentDay - firstDay) / firstDay) * 100;
    return change.toFixed(2) + '%';
  }

  calculateDailyChange(): number[] {
    const dailyChanges: number[] = [];
    for (let i = 0; i < this.stockData.length; i++) {
      const today = this.stockData[i].value ?? 0;
      const yesterday = this.stockData[i - 1]?.value ?? 0;
      const change = ((today - yesterday) / yesterday) * 100;
      dailyChanges.push(change);
    }
    return dailyChanges;
  }

  generateTableData(): any[] {
    const tableRows: any[] = [];
    for (let i = 0; i < this.stockData.length; i++) {
      const formattedValue = this.stockData[i].value?.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }) || 'R$ 0,00';

      const rowData = {
        Dia: i + 1,
        Data: this.formatDate(i),
        Valor: formattedValue,
        'Variação em relação a D-1': this.calculateChangeFromPreviousDay(i) === 'Infinity%' ? '100%' : this.calculateChangeFromPreviousDay(i),
        'Variação em relação à primeira data': this.calculateChangeFromFirstDay(i) === 'Infinity%' ? '100%' : this.calculateChangeFromFirstDay(i)
      };
      tableRows.push(rowData);
    }
    return tableRows;
  }

  prepareChartData() {
    this.lineChartLabels = this.tableData.map(item => item['Dia']);
    const variationData = this.calculateDailyChange();

    this.lineChartData = [
      { data: variationData, label: 'Variação Diária (%)' }
    ];
  }

  onValueSelected(selectedValue: string) {
    this.stockSymbol = selectedValue
    this.fetchStockData()
  }

}
