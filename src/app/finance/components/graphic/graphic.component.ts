import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class GraphicComponent {
  @Input() lineChartData: any;
  @Input() lineChartLabels: any;
  @Input() lineChartLegend: any;
  @Input() lineChartOptions: any;
}
