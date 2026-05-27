import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProyectoCrearPageRoutingModule } from './proyecto-crear-routing.module';

// Asegúrate de que esta línea esté aquí
import { ProyectoCrearPage } from './proyecto-crear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProyectoCrearPageRoutingModule,
    ProyectoCrearPage // <--- LO MOVIMOS AQUÍ ADENTRO
  ],
  // declarations: [ProyectoCrearPage] <--- ELIMINAMOS ESTO
})
export class ProyectoCrearPageModule {}
