import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareaEditarPageRoutingModule } from './tarea-editar-routing.module';

import { TareaEditarPage } from './tarea-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareaEditarPageRoutingModule
  ],
  declarations: [TareaEditarPage]
})
export class TareaEditarPageModule {}
