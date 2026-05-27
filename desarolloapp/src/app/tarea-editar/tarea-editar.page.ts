import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

import { TareaService } from '../services/tarea.service';
import { UsuarioService } from '../services/usuario.service'; 
// 1. IMPORTAMOS LOS NUEVOS SERVICIOS
import { CategoriaService } from '../services/categoria.service';
import { PrioridadService } from '../services/prioridad.service';

@Component({
  selector: 'app-tarea-editar',
  templateUrl: './tarea-editar.page.html',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class TareaEditarPage implements OnInit {
  tareaForm: FormGroup;
  idTarea!: number;
  idProyecto!: number; 
  
  // 2. VARIABLES PARA LOS SELECTORES DEL HTML
  usuarios: any[] = []; 
  categorias: any[] = [];
  prioridads: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private usuarioService: UsuarioService,
    // 3. INYECTAMOS LOS SERVICIOS
    private categoriaService: CategoriaService,
    private prioridadService: PrioridadService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    // 4. ALINEAMOS LOS NOMBRES EXACTOS CON EL HTML
    this.tareaForm = this.fb.group({
      nombre: ['', Validators.required], 
      estado: ['', Validators.required], 
      id_usuario: ['', Validators.required], 
      id_categoria: ['', Validators.required],
      id_prioridad: ['', Validators.required]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('idTarea');
    if (idParam) {
      this.idTarea = parseInt(idParam, 10);
      
      // 5. DESCARGAMOS TODOS LOS CATÁLOGOS AL ABRIR LA PÁGINA
      this.cargarUsuarios(); 
      this.cargarCategorias();
      this.cargarPrioridads();
      
      this.cargarDatosTarea();
    }
  }

  async cargarUsuarios() {
    try {
      const response = await this.usuarioService.getUsuarios();
      this.usuarios = response.data;
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  }

  // 6. FUNCIONES PARA OBTENER CATEGORÍAS Y PRIORIDADES
  async cargarCategorias() {
    try {
      const response = await this.categoriaService.getCategorias();
      this.categorias = response.data;
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    }
  }

  async cargarPrioridads() {
    try {
      const response = await this.prioridadService.getPrioridades();
      this.prioridads = response.data;
    } catch (error) {
      console.error('Error al cargar prioridades:', error);
    }
  }

  async cargarDatosTarea() {
    const loading = await this.loadingCtrl.create({ message: 'Cargando datos...' });
    await loading.present();

    try {
      const response = await this.tareaService.getTarea(this.idTarea);
      const tarea = response.data;
      this.idProyecto = tarea.id_proyecto; 

      // 7. PARCHEO DE DATOS CORREGIDO (Sin .toString() para que coincidan los IDs)
      this.tareaForm.patchValue({
        nombre: tarea.titulo, 
        estado: tarea.id_estado ? tarea.id_estado.toString() : '',
        id_usuario: tarea.id_usuario, 
        id_categoria: tarea.id_categoria, 
        id_prioridad: tarea.id_prioridad  
      });
    } catch (error) {
      console.error('Error al cargar:', error);
    } finally {
      loading.dismiss();
    }
  }

  // 8. FUNCIÓN DE GUARDADO (Renombrada para coincidir con el HTML)
  async actualizarTarea() {
    if (this.tareaForm.invalid) {
      const alert = await this.alertCtrl.create({
        header: 'Incompleto',
        message: 'Por favor, llena todos los campos.',
        buttons: ['OK']
      });
      await alert.present();
      return; 
    }

    const loading = await this.loadingCtrl.create({ message: 'Actualizando...' });
    await loading.present();

    try {
      const form = this.tareaForm.value;
      const datosActualizados = {
        titulo: form.nombre, 
        id_estado: parseInt(form.estado, 10),
        id_usuario: parseInt(form.id_usuario, 10), 
        id_categoria: parseInt(form.id_categoria, 10), 
        id_prioridad: parseInt(form.id_prioridad, 10)
      };

      await this.tareaService.actualizarTarea(this.idTarea, datosActualizados);
      this.navCtrl.navigateBack(`/tarea-lista/${this.idProyecto}`);
    } catch (error) {
      console.error('Error al actualizar:', error);
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Hubo un problema al actualizar la tarea.',
        buttons: ['OK']
      });
      await alert.present();
    } finally {
      loading.dismiss();
    }
  }
}