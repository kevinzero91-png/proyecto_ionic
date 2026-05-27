import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { TareaService } from '../services/tarea.service';
import { UsuarioService } from '../services/usuario.service';
import { CategoriaService } from '../services/categoria.service'; // <-- NUEVO
import { PrioridadService } from '../services/prioridad.service'; // <-- NUEVO

@Component({
  selector: 'app-tarea-lista',
  templateUrl: './tarea-lista.page.html',
  styleUrls: ['./tarea-lista.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class TareaListaPage {
  idProyecto!: number;
  tareas: any[] = [];
  usuarios: any[] = []; 
  categorias: any[] = []; // <-- NUEVO
  prioridades: any[] = []; // <-- NUEVO

  constructor(
    private route: ActivatedRoute,
    private tareaService: TareaService,
    private usuarioService: UsuarioService,
    private categoriaService: CategoriaService, // <-- NUEVO
    private prioridadService: PrioridadService, // <-- NUEVO
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    const idParam = this.route.snapshot.paramMap.get('proyectoId');
    if (idParam) {
      this.idProyecto = parseInt(idParam, 10);
      this.cargarCatalogos(); // Agrupamos las cargas
      this.cargarTareas();
    }
  }

  // Descargamos todos los catálogos al mismo tiempo
  async cargarCatalogos() {
    try {
      const resUsuarios = await this.usuarioService.getUsuarios();
      this.usuarios = resUsuarios.data;
      
      const resCategorias = await this.categoriaService.getCategorias();
      this.categorias = resCategorias.data;

      const resPrioridades = await this.prioridadService.getPrioridades();
      this.prioridades = resPrioridades.data;
    } catch (error) {
      console.error('Error al cargar catálogos:', error);
    }
  }

  async cargarTareas() {
    const loading = await this.loadingCtrl.create({ message: 'Cargando tareas...', spinner: 'bubbles' });
    await loading.present();
    try {
      const response = await this.tareaService.getTareasPorProyecto(this.idProyecto);
      this.tareas = response.data.filter((tarea: any) => tarea.id_proyecto === this.idProyecto);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
    } finally {
      loading.dismiss();
    }
  }

  irACrearTarea() {
    this.navCtrl.navigateForward(`/tarea-crear/${this.idProyecto}`);
  }

  // --- TRADUCTORES ---

  obtenerNombreEstado(id: number): string {
    switch(id) {
      case 1: return 'Pendiente'; case 2: return 'En progreso'; case 3: return 'Completada'; default: return 'Desconocido';
    }
  }

  obtenerColorEstado(id: number): string {
    switch(id) {
      case 1: return 'warning'; case 2: return 'tertiary'; case 3: return 'success'; default: return 'medium';
    }
  }

  obtenerNombreUsuario(id_usuario: number): string {
    if (!id_usuario) return 'Sin asignar';
    const encontrado = this.usuarios.find(u => u.id_usuario === id_usuario);
    return encontrado ? encontrado.nombre : 'Desconocido';
  }

  // Traductores Nuevos
  obtenerNombreCategoria(id_categoria: number): string {
    if (!id_categoria) return '';
    const encontrado = this.categorias.find(c => c.id_categoria === id_categoria);
    return encontrado ? encontrado.nombre : 'Sin Categoría';
  }

 obtenerNombrePrioridad(id_prioridad: number): string {
    if (!id_prioridad) return '';
    const encontrado = this.prioridades.find(p => p.id_prioridad === id_prioridad);
    return encontrado ? encontrado.nivel : 'Sin Prioridad'; // <-- Cambiado a .nivel
  }

  // Le damos un color rojo si la prioridad es 1 (Alta), amarillo si es 2 (Media), etc.
  obtenerColorPrioridad(id_prioridad: number): string {
    switch(id_prioridad) {
      case 1: return 'danger';   // Alta = Rojo
      case 2: return 'warning';  // Media = Amarillo
      case 3: return 'success';  // Baja = Verde
      default: return 'light';
    }
  }

  // --- BOTONES DESLIZABLES ---
  editarTarea(tarea: any) { this.navCtrl.navigateForward(`/tarea-editar/${tarea.id_tarea}`); }

  async confirmarEliminar(tarea: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirmar', message: `¿Eliminar "${tarea.titulo}"?`,
      buttons: [ { text: 'Cancelar', role: 'cancel' }, { text: 'Eliminar', role: 'destructive', handler: () => { this.eliminarTarea(tarea.id_tarea); } } ]
    });
    await alert.present();
  }

  async eliminarTarea(id_tarea: number) {
    try { await this.tareaService.eliminarTarea(id_tarea); this.cargarTareas(); } 
    catch (error) { console.error('Error al eliminar:', error); }
  }
}