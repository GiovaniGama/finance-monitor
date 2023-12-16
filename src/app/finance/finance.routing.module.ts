import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FinanceComponent } from "./finance.component";

const financeRoutes: Routes = [
  { path: 'finance', component: FinanceComponent},
  { path: '', redirectTo: 'finance', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(financeRoutes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule {}
