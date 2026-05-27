import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // <-- ESTO ES LO QUE RECONOCE LAS ETIQUETAS

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // <-- INYECTAMOS IONIC AQUÍ
})
export class ConfiguracionPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}