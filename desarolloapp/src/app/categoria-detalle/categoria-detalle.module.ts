import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaDetallePageRoutingModule } from './categoria-detalle-routing.module';

import { CategoriaDetallePage } from './categoria-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaDetallePageRoutingModule
  ],
  declarations: [CategoriaDetallePage]
})
export class CategoriaDetallePageModule {}
