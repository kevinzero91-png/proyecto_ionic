import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Importamos los servicios de tu backend
import { ProyectoService } from '../services/proyecto.service';
import { TareaService } from '../services/tarea.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class InicioPage {
  
  // Variables para la identidad y métricas
  nombreUsuario: string = 'Desarrollador'; // <-- Identidad dinámica
  totalProyectos: number = 0;
  tareasActivas: number = 0;
  tareasCompletadas: number = 0;
  actividadReciente: any[] = [];

  constructor(
    private proyectoService: ProyectoService,
    private tareaService: TareaService
  ) { }

  ionViewWillEnter() {
    this.cargarIdentidad(); // 1. Cargamos nombre
    this.cargarMetricas();  // 2. Cargamos datos
  }

  // --- NUEVA FUNCIÓN DE IDENTIDAD ---
  cargarIdentidad() {
    const data = localStorage.getItem('user_data');
    if (data) {
      const user = JSON.parse(data);
      this.nombreUsuario = user.nombre;
    }
  }

  async cargarMetricas() {
    try {
      const resProyectos = await this.proyectoService.getProyectos();
      const proyectos = resProyectos.data || [];
      this.totalProyectos = proyectos.length;

      const resTareas = await this.tareaService.getTareas(); 
      const tareas = resTareas.data || [];

      this.tareasActivas = tareas.filter((t: any) => t.id_estado === 1 || t.id_estado === 2).length;
      this.tareasCompletadas = tareas.filter((t: any) => t.id_estado === 3).length;
      this.actividadReciente = tareas.slice(-3).reverse();

    } catch (error) {
      console.error('Error al conectar con Yii2:', error);
    }
  }

  obtenerNombreEstado(id: number): string {
    switch(id) {
      case 1: return 'Pendiente'; 
      case 2: return 'En progreso'; 
      case 3: return 'Completada'; 
      default: return 'Desconocido';
    }
  }

  obtenerColorEstado(id: number): string {
    switch(id) {
      case 1: return 'warning'; 
      case 2: return 'tertiary'; 
      case 3: return 'success'; 
      default: return 'medium';
    }
  }
}