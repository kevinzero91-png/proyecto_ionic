import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareaEditarPage } from './tarea-editar.page';

const routes: Routes = [
  {
    path: '',
    component: TareaEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareaEditarPageRoutingModule {}
