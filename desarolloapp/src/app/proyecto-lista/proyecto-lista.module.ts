import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProyectoListaPageRoutingModule } from './proyecto-lista-routing.module';

// Asegúrate de que esta importación esté aquí arriba
import { ProyectoListaPage } from './proyecto-lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProyectoListaPageRoutingModule,
    ProyectoListaPage // <--- AGREGA ESTO AQUÍ ADENTRO DE IMPORTS
  ],
  // declarations: [ProyectoListaPage] <--- BORRA ESTA LÍNEA POR COMPLETO
})
export class ProyectoListaPageModule {}