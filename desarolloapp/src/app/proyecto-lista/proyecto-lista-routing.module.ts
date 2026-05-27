import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProyectoListaPage } from './proyecto-lista.page';

const routes: Routes = [
  {
    path: '',
    component: ProyectoListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProyectoListaPageRoutingModule {}
