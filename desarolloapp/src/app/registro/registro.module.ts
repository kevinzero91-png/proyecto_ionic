import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RegistroPageRoutingModule } from './registro-routing.module';
import { RegistroPage } from './registro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistroPageRoutingModule,
    RegistroPage // <-- LO MOVIMOS AQUÍ ADENTRO
  ],
  // declarations: [RegistroPage] <-- ESTO SE BORRA
})
export class RegistroPageModule {}
