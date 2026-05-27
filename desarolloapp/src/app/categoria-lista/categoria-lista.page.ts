import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController, ModalController, AlertController } from '@ionic/angular';
import axios from 'axios';
import { CategoriaCrearPage } from '../categoria-crear/categoria-crear.page';

@Component({
  selector: 'app-categoria-lista',
  templateUrl: './categoria-lista.page.html',
  styleUrls: ['./categoria-lista.page.scss'],
  standalone: false,
})
export class CategoriaListaPage implements OnInit {
  baseUrl = 'http://localhost:8080/categorias';
  categorias: any = [];

  constructor( private loadingCtrl: LoadingController, 
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.cargarcategorias();
  }

  async cargarcategorias(event?: InfiniteScrollCustomEvent) {
    const loading = await this.loadingCtrl.create({
        message: 'Cargando',
        spinner: 'bubbles',
    });
    await loading.present();

    // 1. Extraemos el token real de la memoria del dispositivo
    const tokenReal = localStorage.getItem('auth_token');

    const response = await axios({
        method: 'get',
        url: this.baseUrl,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${tokenReal}` // <-- Token inyectado dinámicamente
        }
    }).then((response) => {
        this.categorias = response.data;
        event?.target.complete();
    }).catch(function (error) {
        console.log(error);     
    });
    loading.dismiss();
  }

  async new() {
    const paginaModal = await this.modalCtrl.create({
        component: CategoriaCrearPage,
        breakpoints : [0, 0.3, 0.5, 0.95],
        initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
        this.cargarcategorias();
    });
  }

  async editar(id_categoria: number) {
    const paginaModal = await this.modalCtrl.create({
      component: CategoriaCrearPage,
      componentProps: {
        'id_categoria': id_categoria
      },
      breakpoints: [0, 0.3, 0.5, 0.95],
      initialBreakpoint: 0.95
    });
    await paginaModal.present();
    paginaModal.onDidDismiss().then((data) => {
        this.cargarcategorias();
    });
  }

  // 1. Esta función SOLO pregunta si estás seguro
  async alertEliminar(id_categoria: number, nombre: string = "") {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Categoría',
      message: `¿Estás seguro de eliminar "${nombre}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        { 
          text: 'Confirmar', 
          role: 'confirm', 
          handler: () => { this.eliminar(id_categoria); } 
        }
      ]
    });
    await alert.present();
  }

  // 2. Esta función SOLO elimina y muestra el resultado final
  async eliminar(id_categoria: number) {
    // 2. Extraemos el token real para autorizar la eliminación
    const tokenReal = localStorage.getItem('auth_token');

    try {
        const response = await axios({
            method: 'delete',
            url: `${this.baseUrl}/${id_categoria}`,
            withCredentials: true,
            headers: { 
                'Authorization': `Bearer ${tokenReal}` // <-- Token inyectado dinámicamente
            }
        });

        if (response?.status === 204) {
            this.alertResultado('Éxito', 'La categoría ha sido eliminada.');
        }
    } catch (error: any) {
        let mensaje = 'Error al eliminar.';
        if (error.response?.status === 404) {
            mensaje = 'Error: Esta categoría ya no existe (404).';
        } else if (error.response?.status === 401) {
            mensaje = 'Acceso Denegado: Tu sesión ha expirado o no tienes permisos.';
        }
        this.alertResultado('Error', mensaje);
    }
  }

  // 3. Esta función muestra el resultado (Éxito o Error)
  async alertResultado(titulo: string, mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: [{
          text: 'OK',
          handler: () => { this.cargarcategorias(); }
      }]
    });
    await alert.present();
  }
}