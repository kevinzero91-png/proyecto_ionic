import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaListaPageRoutingModule } from './categoria-lista-routing.module';

import { CategoriaListaPage } from './categoria-lista.page';
import { ToolbarModule } from '../components/toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaListaPageRoutingModule,
    ToolbarModule,
  ],
  declarations: [CategoriaListaPage]
})
export class CategoriaListaPageModule {}
