import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { IonicModule, NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TareaService } from '../services/tarea.service';
import { UsuarioService } from '../services/usuario.service'; 

// 1. IMPORTAMOS LOS NUEVOS SERVICIOS
import { CategoriaService } from '../services/categoria.service';
import { PrioridadService } from '../services/prioridad.service';

@Component({
  selector: 'app-tarea-crear',
  templateUrl: './tarea-crear.page.html',
  styleUrls: ['./tarea-crear.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, RouterModule] 
})
export class TareaCrearPage implements OnInit {
  tareaForm: FormGroup;
  idProyecto!: number;
  
  // 2. VARIABLES PARA LAS LISTAS (El HTML lee estas variables)
  usuarios: any[] = []; 
  categorias: any[] = [];
  prioridads: any[] = []; 

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private usuarioService: UsuarioService,
    // 3. INYECTAMOS LOS SERVICIOS EN EL CONSTRUCTOR
    private categoriaService: CategoriaService,
    private prioridadService: PrioridadService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
    this.tareaForm = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['1', Validators.required],
      id_usuario: ['', Validators.required],
      // 4. AGREGAMOS LOS CAMPOS AL FORMULARIO
      id_categoria: ['', Validators.required],
      id_prioridad: ['', Validators.required]
    });
  }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('proyectoId');
    if (idParam) {
      this.idProyecto = parseInt(idParam, 10);
    }
    // 5. LLAMAMOS A LAS FUNCIONES AL ABRIR LA PÁGINA
    this.cargarUsuarios(); 
    this.cargarCategorias();
    this.cargarPrioridades();
  }

  async cargarUsuarios() {
    try {
      const response = await this.usuarioService.getUsuarios();
      this.usuarios = response.data; // Nota: Si te marca error de undefined, cambia response.data por simplemente response
    } catch (error) {
      console.error('Error al cargar usuarios', error);
    }
  }

  // 6. CREAMOS LAS FUNCIONES PARA DESCARGAR LOS CATÁLOGOS
  async cargarCategorias() {
    try {
      const response = await this.categoriaService.getCategorias();
      this.categorias = response.data; // Nota: Si te marca error de undefined, cambia response.data por simplemente response
    } catch (error) {
      console.error('Error al cargar categorías', error);
    }
  }

  async cargarPrioridades() {
    try {
      const response = await this.prioridadService.getPrioridades();
      this.prioridads = response.data; // Nota: Si te marca error de undefined, cambia response.data por simplemente response
    } catch (error) {
      console.error('Error al cargar prioridades', error);
    }
  }

  async guardarTarea() {
    if (this.tareaForm.invalid) {
      this.mostrarAlerta('Incompleto', 'Por favor, llena todos los campos.');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Guardando...', spinner: 'bubbles' });
    await loading.present();

    const form = this.tareaForm.value;
    
    const datosParaYii2 = {
      titulo: form.nombre,
      id_estado: parseInt(form.estado, 10), 
      id_proyecto: this.idProyecto,
      id_usuario: parseInt(form.id_usuario, 10), 
      // 7. AHORA ENVIAMOS LO QUE SELECCIONASTE EN VEZ DE NULL
      id_categoria: parseInt(form.id_categoria, 10),
      id_prioridad: parseInt(form.id_prioridad, 10),
      id_frecuencia: null,
      id_etiqueta: null,
      descripcion: null,
      vencimiento: null
    };

    try {
      await this.tareaService.crearTarea(datosParaYii2);
      this.tareaForm.reset({ estado: '1' }); 
      this.navCtrl.navigateBack(`/tarea-lista/${this.idProyecto}`); 
    } catch (error: any) {
      console.error('MOTIVO DEL RECHAZO YII2:', error.response?.data);
      this.mostrarAlerta('Error', 'No se pudo guardar la tarea.');
    } finally {
      loading.dismiss();
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({ header, message, buttons: ['OK'] });
    await alert.present();
  }
}