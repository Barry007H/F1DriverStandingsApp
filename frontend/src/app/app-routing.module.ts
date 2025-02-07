import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StandingsTableComponent } from './standings-table/standings-table.component';

const routes: Routes = [
  { path: '', component: StandingsTableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
