import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectoCrearPage } from './proyecto-crear.page';

const routes: Routes = [
  {
    path: '',
    component: ProyectoCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectoCrearPageRoutingModule {}
