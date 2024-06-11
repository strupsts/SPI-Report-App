import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {ReportListComponent} from "./report-feature/components/report-list/report-list.component";

const routes: Routes = [
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ReportListComponent
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
