import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareaListaPage } from './tarea-lista.page';

const routes: Routes = [
  {
    path: '',
    component: TareaListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareaListaPageRoutingModule {}
