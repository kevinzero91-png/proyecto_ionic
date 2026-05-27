import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TareaCrearPage } from './tarea-crear.page';

const routes: Routes = [
  {
    path: '',
    component: TareaCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TareaCrearPageRoutingModule {}
