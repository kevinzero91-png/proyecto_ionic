import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { InicioPageRoutingModule } from './inicio-routing.module';
import { InicioPage } from './inicio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    InicioPage // <-- 1. LO MOVIMOS AQUÍ ADENTRO
  ]
  // 2. BORRAMOS LA LÍNEA DE "declarations" POR COMPLETO
})
export class InicioPageModule {}