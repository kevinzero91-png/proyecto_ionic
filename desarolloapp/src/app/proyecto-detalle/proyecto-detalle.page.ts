import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, LoadingController, AlertController } from '@ionic/angular';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { ProyectoService } from '../services/proyecto.service';
import axios from 'axios';

@Component({
  selector: 'app-proyecto-detalle',
  templateUrl: './proyecto-detalle.page.html',
  styleUrls: ['./proyecto-detalle.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule]
})
export class ProyectoDetallePage implements OnInit {
  proyecto: any = null;
  idProyecto!: number;
  miembrosEquipo: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private proyectoService: ProyectoService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idProyecto = parseInt(idParam, 10);
      this.cargarDetalleProyecto();
    }
  }

  async cargarDetalleProyecto() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando detalles...',
      spinner: 'bubbles',
      cssClass: 'custom-loading'
    });
    await loading.present();

    try {
      const response = await this.proyectoService.getProyecto(this.idProyecto);
      this.proyecto = response.data;
      await this.cargarEquipo();
    } catch (error) {
      console.error('Error al cargar detalle', error);
      this.mostrarError('No se pudo obtener la información del proyecto.');
      this.navCtrl.navigateBack('/proyecto-lista');
    } finally {
      loading.dismiss();
    }
  }

  async cargarEquipo() {
    try {
      // 1. Descargamos las relaciones (Yii2 manda todas por defecto)
      const resEquipo = await axios.get('http://localhost:8080/equipos');
      const todasRelaciones = resEquipo.data;

      // =========================================================
      // FILTRO APLICADO: Solo conservamos las de este proyecto
      // =========================================================
      const relaciones = todasRelaciones.filter((rel: any) => rel.id_proyecto == this.idProyecto);

      // 2. Descargamos usuarios para sacar foto y nombre
      const resUsuarios = await axios.get('http://localhost:8080/usuarios');
      const todosUsuarios = resUsuarios.data;

      const mapaUsuarios = new Map();

      // 3. Iteramos SOLO sobre las relaciones filtradas
      relaciones.forEach((relacion: any) => {
        const usuarioInfo = todosUsuarios.find((u: any) => u.id_usuario == relacion.id_usuario);
        
        if (usuarioInfo && !mapaUsuarios.has(usuarioInfo.id_usuario)) {
          mapaUsuarios.set(usuarioInfo.id_usuario, {
            nombre: usuarioInfo.nombre,
            foto_perfil: (usuarioInfo.foto_perfil && usuarioInfo.foto_perfil !== 'default-avatar.png') 
                          ? `http://localhost:8080/uploads/avatars/${usuarioInfo.foto_perfil}` 
                          : 'https://ionicframework.com/docs/img/demos/avatar.svg',
            rol: relacion.rol
          });
        }
      });

      this.miembrosEquipo = Array.from(mapaUsuarios.values());
    } catch (error) {
      console.error('Error al cargar el equipo:', error);
    }
  }

  // --- FUNCIÓN RECUPERADA ---
  async mostrarError(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'alert-dark'
    });
    await alert.present();
  }
}