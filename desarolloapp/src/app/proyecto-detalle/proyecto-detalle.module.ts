import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProyectoDetallePageRoutingModule } from './proyecto-detalle-routing.module';
// Asegúrate de que tu página esté importada aquí arriba
import { ProyectoDetallePage } from './proyecto-detalle.page'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProyectoDetallePageRoutingModule,
    ProyectoDetallePage // <--- LO MOVIMOS AQUÍ ADENTRO
  ]
  // Ya no usamos "declarations" porque es un componente standalone
})
export class ProyectoDetallePageModule {}