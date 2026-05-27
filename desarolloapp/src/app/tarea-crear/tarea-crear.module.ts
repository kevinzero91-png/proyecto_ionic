import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TareaCrearPageRoutingModule } from './tarea-crear-routing.module';

import { TareaCrearPage } from './tarea-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TareaCrearPageRoutingModule
  ],
  declarations: [TareaCrearPage]
})
export class TareaCrearPageModule {}
