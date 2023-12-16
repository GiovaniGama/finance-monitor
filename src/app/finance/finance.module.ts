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


@NgModule({
  declarations: [
    FinanceComponent,
    InputSelectComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FinanceRoutingModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class FinanceModule { }
