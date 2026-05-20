import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaListaPage } from './categoria-lista.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaListaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaListaPageRoutingModule {}
