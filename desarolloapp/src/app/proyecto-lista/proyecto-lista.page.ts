import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { IonicModule, NavController, LoadingController, AlertController } from '@ionic/angular';
import { RouterModule, NavigationExtras } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
// <-- IMPORTAMOS EL SERVICIO DE TAREAS -->
import { TareaService } from '../services/tarea.service'; 

@Component({
  selector: 'app-proyecto-lista',
  templateUrl: './proyecto-lista.page.html',
  styleUrls: ['./proyecto-lista.page.scss'],
  standalone: true, 
  imports: [CommonModule, IonicModule, RouterModule]
})
export class ProyectoListaPage implements OnInit {
  proyectos: any[] = [];

  constructor(
    private proyectoService: ProyectoService,
    private tareaService: TareaService, // <-- LO INYECTAMOS AQUÍ
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private navCtrl: NavController 
  ) { }

  ionViewWillEnter() {
    this.cargarProyectos();
  }

  ngOnInit() {}

  async cargarProyectos() {
    const loading = await this.loadingCtrl.create({
      message: 'Calculando progreso...',
      spinner: 'bubbles' 
    });
    await loading.present();

    try {
      // 1. Descargamos Proyectos
      const resProyectos = await this.proyectoService.getProyectos();
      const proyectosData = resProyectos.data || [];

      // 2. Descargamos TODAS las Tareas
      const resTareas = await this.tareaService.getTareas();
      const todasLasTareas = resTareas.data || [];

      // 3. Fusionamos los datos y calculamos matemáticas
      this.proyectos = proyectosData.map((proyecto: any) => {
        
        // Filtramos solo las tareas que pertenecen a este proyecto en específico
        const tareasDelProyecto = todasLasTareas.filter((t: any) => t.id_proyecto === proyecto.id_proyecto);
        const totalTareas = tareasDelProyecto.length;

        // Filtramos cuáles de esas ya están completadas (id_estado === 3)
        const tareasCompletadas = tareasDelProyecto.filter((t: any) => t.id_estado === 3).length;

        // Calculamos el valor para la barra (de 0.0 a 1.0)
        let progresoValor = 0;
        if (totalTareas > 0) {
          progresoValor = tareasCompletadas / totalTareas;
        }

        // Creamos el texto visual (ej. "50%")
        const progresoTexto = Math.round(progresoValor * 100) + '%';

        // Retornamos el proyecto original, pero le sumamos nuestras variables nuevas
        return {
          ...proyecto,
          progresoValor: progresoValor,
          progresoTexto: progresoTexto,
          totalTareas: totalTareas
        };
      });

    } catch (error) {
      console.error('Error al cargar proyectos y tareas', error);
      this.mostrarError('No se pudieron cargar los datos. Verifica que Yii2 esté corriendo.');
    } finally {
      loading.dismiss();
    }
  }

  async mostrarError(mensaje: string) {
    const alert = await this.alertCtrl.create({ header: 'Error', message: mensaje, buttons: ['OK'] });
    await alert.present();
  }

  irACrear() {
    this.navCtrl.navigateForward('/proyecto-crear');
  }

  async confirmarEliminar(proyecto: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar el proyecto "${proyecto.nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel', cssClass: 'secondary' },
        { text: 'Eliminar', role: 'destructive', handler: () => { this.ejecutarEliminacion(proyecto.id_proyecto); } }
      ]
    });
    await alert.present();
  }

  async ejecutarEliminacion(id_proyecto: number) {
    const loading = await this.loadingCtrl.create({ message: 'Eliminando...', spinner: 'bubbles' });
    await loading.present();

    try {
      await this.proyectoService.eliminarProyecto(id_proyecto);
      await this.cargarProyectos(); 
    } catch (error) {
      console.error('Error al eliminar', error);
      this.mostrarError('No se pudo eliminar el proyecto.');
    } finally {
      loading.dismiss();
    }
  }

  editarProyecto(proyecto: any) {
    const navigationExtras: NavigationExtras = { queryParams: { proyectoSeleccionado: JSON.stringify(proyecto) } };
    this.navCtrl.navigateForward('/proyecto-crear', navigationExtras);
  }
  verDetalle(id_proyecto: number) {
    // AHORA SÍ TE LLEVARÁ A LA PANTALLA DE DETALLES
    this.navCtrl.navigateForward(`/proyecto-detalle/${id_proyecto}`);
  }
  
}