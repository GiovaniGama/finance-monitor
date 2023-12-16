import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceComponent } from './finance.component';
import { HttpClientModule } from '@angular/common/http'
import { FinanceRoutingModule } from './finance.routing.module';
import { InputSelectComponent } from './components/input-select/input-select.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { TableComponent } from './components/table/table.component';
import { NgChartsModule } from 'ng2-charts';
import { GraphicComponent } from './components/graphic/graphic.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    FinanceComponent,
    InputSelectComponent,
    TableComponent,
    GraphicComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FinanceRoutingModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    NgChartsModule,
    MatTabsModule
  ]
})
export class FinanceModule { }
