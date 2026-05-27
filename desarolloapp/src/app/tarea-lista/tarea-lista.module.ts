import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareaListaPageRoutingModule } from './tarea-lista-routing.module';

import { TareaListaPage } from './tarea-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareaListaPageRoutingModule
  ],
  declarations: [TareaListaPage]
})
export class TareaListaPageModule {}
