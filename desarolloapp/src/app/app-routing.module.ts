import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // --- 1. AQUÍ ESTÁ EL CAMBIO PRINCIPAL ---
  // La ruta por defecto ahora te manda obligatoriamente al login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  // --- 2. MOVEMOS LOS TABS AQUÍ ---
  // Ahora las pestañas viven en su propia ruta protegida
  {
    path: 'tabs',
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
  },
  
  // <--- CORRECCIÓN: Ahora usan loadComponent porque son Standalone --->
  {
    path: 'proyecto-lista',
    loadComponent: () => import('./proyecto-lista/proyecto-lista.page').then( m => m.ProyectoListaPage)
  },
  {
    path: 'proyecto-crear',
    loadComponent: () => import('./proyecto-crear/proyecto-crear.page').then( m => m.ProyectoCrearPage)
  },
  // <---------------------------------------------------------------->

  {
    path: 'proyecto-detalle/:id', 
    loadComponent: () => import('./proyecto-detalle/proyecto-detalle.page').then( m => m.ProyectoDetallePage)
  },
  {
    path: 'tarea-lista/:proyectoId', 
    loadComponent: () => import('./tarea-lista/tarea-lista.page').then( m => m.TareaListaPage)
  },
  {
    path: 'tarea-crear/:proyectoId', 
    loadComponent: () => import('./tarea-crear/tarea-crear.page').then( m => m.TareaCrearPage)
  },
  {
    path: 'tarea-editar/:idTarea',
    loadComponent: () => import('./tarea-editar/tarea-editar.page').then( m => m.TareaEditarPage)
  },

  // <--- CORRECCIÓN: El Dashboard también es Standalone --->
  {
    path: 'inicio',
    loadComponent: () => import('./inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}