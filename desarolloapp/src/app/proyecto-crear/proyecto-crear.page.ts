import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, LoadingController, AlertController, ViewWillEnter } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProyectoService } from '../services/proyecto.service';
import axios from 'axios';

@Component({
  selector: 'app-proyecto-crear',
  templateUrl: './proyecto-crear.page.html',
  styleUrls: ['./proyecto-crear.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ProyectoCrearPage implements OnInit, ViewWillEnter {

 proyecto: any = {
  id_proyecto: null,
  nombre: '',
  descripcion: '',
  inicio: null, // <-- Nombre exacto del modelo
  fin: null,    // <-- Nombre exacto del modelo
  estado: 'Planificado', // <-- Valor por defecto que definiste
  miembros: [] 
};

  esEdicion = false;
  listaUsuarios: any[] = []; 

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private proyectoService: ProyectoService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  // =========================================================================
  // CICLO DE VIDA: Ahora es asíncrono para asegurar el orden correcto
  // =========================================================================
  async ionViewWillEnter() {
    // 1. PRIMERO obligamos a que se cargue la lista completa de opciones
    await this.cargarUsuariosDisponibles();

    // 2. DESPUÉS procesamos qué proyecto se seleccionó
    this.route.queryParams.subscribe(params => {
      if (params && params['proyectoSeleccionado']) {
        this.proyecto = JSON.parse(params['proyectoSeleccionado']);
        this.esEdicion = true;
        this.proyecto.miembros = []; 
        
        // 3. FINALMENTE buscamos quiénes están palomeados
        this.cargarMiembrosExistentes(this.proyecto.id_proyecto);
      } else {
        this.esEdicion = false;
        this.proyecto = {
          id_proyecto: null,
          nombre: '',
          descripcion: '',
          miembros: [] 
        };
      }
    });
  }

  async cargarMiembrosExistentes(idProyecto: number) {
    try {
      const response = await axios.get('http://localhost:8080/equipos');
      const todasRelaciones = response.data || [];
      const relacionesEsteProyecto = todasRelaciones.filter((rel: any) => rel.id_proyecto == idProyecto);
      
      // Convertimos los IDs a string para evitar conflictos numéricos en Ionic
      this.proyecto.miembros = relacionesEsteProyecto.map((rel: any) => rel.id_usuario.toString());
      
      console.log("Integrantes listos para el formulario:", this.proyecto.miembros);
    } catch (error) {
      console.error('Error al cargar miembros:', error);
    }
  }

  // Comparador blindado: convierte ambos lados a string antes de comparar
  compararUsuarios(o1: any, o2: any) {
    return o1 && o2 ? o1.toString() === o2.toString() : o1 === o2;
  }

  async cargarUsuariosDisponibles() {
    try {
      const response = await axios.get('http://localhost:8080/usuarios');
      this.listaUsuarios = response.data || [];
    } catch (error) {
      console.error('Error al descargar catálogo:', error);
    }
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertCtrl.create({ 
      header, 
      message, 
      buttons: ['OK'], 
      cssClass: 'alert-dark' 
    });
    await alert.present();
  }

  async guardarProyecto() {
    if (!this.proyecto.nombre || this.proyecto.nombre.trim() === '') {
      await this.mostrarAlerta('Campos incompletos', 'El nombre del proyecto es obligatorio.');
      return;
    }

    const userDataStr = localStorage.getItem('user_data');
    if (userDataStr) {
      const user = JSON.parse(userDataStr);
      const credencialReal = this.listaUsuarios.find((u: any) => u.nombre === user.nombre);
      this.proyecto.id_usuario = credencialReal ? credencialReal.id_usuario : 1; 
    } else {
      this.proyecto.id_usuario = 1; 
    }

    const loading = await this.loadingCtrl.create({ 
      message: 'Guardando datos...', 
      spinner: 'bubbles', 
      cssClass: 'custom-loading' 
    });
    await loading.present();

    try {
      // LOG DE DIAGNÓSTICO: Esto se verá en tu consola al guardar (F12)
      console.log("ENVIANDO A YII2:", this.proyecto);

      if (this.esEdicion && this.proyecto.id_proyecto) {
        await this.proyectoService.actualizarProyecto(this.proyecto.id_proyecto, this.proyecto);
      } else {
        await this.proyectoService.crearProyecto(this.proyecto);
      }
      
      this.navCtrl.navigateBack('/proyecto-lista');
      
    } catch (error: any) {
      await this.mostrarAlerta('Error de servidor', 'Revisa la consola para más detalles.');
    } finally {
      loading.dismiss();
    }
  }
}