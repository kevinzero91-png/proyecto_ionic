import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'categoria-lista',
    loadChildren: () => import('./categoria-lista/categoria-lista.module').then( m => m.CategoriaListaPageModule)
  },
  {
    path: 'categoria-detalle/:id_categoria',
    loadChildren: () => import('./categoria-detalle/categoria-detalle.module').then( m => m.CategoriaDetallePageModule)
  },
  {
    path: 'categoria-crear',
    loadChildren: () => import('./categoria-crear/categoria-crear.module').then( m => m.CategoriaCrearPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
