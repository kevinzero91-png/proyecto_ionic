import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CategoriaCrearPageRoutingModule } from './categoria-crear-routing.module';

import { CategoriaCrearPage } from './categoria-crear.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaCrearPageRoutingModule,
    ReactiveFormsModule
    
  ],
  declarations: [CategoriaCrearPage]
})
export class CategoriaCrearPageModule {}
