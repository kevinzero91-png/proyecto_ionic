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
    const response = await axios({
        method: 'get',
        url: this.baseUrl,
        withCredentials: true,
        headers: {
            'Accept': 'application/json'
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
async alertEliminar(id_categoria: number, nombre : string = "") {
    const alert = await this.alertCtrl.create({
      header: 'Categoria',
      subHeader: 'Eliminar',
      message: '¿Estás seguro de eliminar la categoria ' + id_categoria + '?',
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: () => {
            this.eliminar(id_categoria);
          }
        }
      ]
    });
    await alert.present();
}

async eliminar(id_categoria: number) {
    const response = await axios({
      method: 'delete',
      url: this.baseUrl + '/' + id_categoria,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 100-token'
      }
    }).then((response) => {
      if (response?.status == 204) {
        this.alertEliminado(id_categoria, 'La categoria con id ' + id_categoria + ' ha sido eliminada');
      }
    }).catch(function (error) {
      console.log(error);
    });
}
async alertEliminado(id_categoria: number, msg = "") {
    const alert = await this.alertCtrl.create({
      header: 'Categoria',
      subHeader: 'Eliminado',
      message: msg,
      cssClass: 'alert-center',
      buttons: [
        {
          text: 'Continuar',
          role: 'cancel',
        },
        {
          text: 'Salir',
          role: 'confirm',
          handler: () => {
            this.regresar();
          },
        },
      ],
    });

    await alert.present();
}
private regresar() {
    this.router.navigate(['categoria-lista']).then(() => {
      window.location.reload();
    });
}
}
