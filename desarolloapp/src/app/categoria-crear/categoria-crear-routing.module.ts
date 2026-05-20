import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaCrearPage } from './categoria-crear.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaCrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaCrearPageRoutingModule {}
