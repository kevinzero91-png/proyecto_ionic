import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-categoria-detalle',
  templateUrl: './categoria-detalle.page.html',
  styleUrls: ['./categoria-detalle.page.scss'],
  standalone: false,
})
export class CategoriaDetallePage implements OnInit {

constructor(
  private route: ActivatedRoute,
  private loading: LoadingController
  ) { }

categoria: any = null;

  ngOnInit() {this.cargarCategoria();}

  async cargarCategoria() {const id_categoria = this.route.snapshot.paramMap.get('id_categoria');
  const loading = await this.loading.create({
    message: 'Cargando',
    spinner: 'bubbles',
  });
  await loading.present();
  const response = await axios({
    method: 'get',
    url: "http://localhost:8080/categorias/"+id_categoria,
    withCredentials: true,
    headers: {
      'Accept': 'application/json'
    }
  }).then((response) => {
    this.categoria = response.data;
  }).catch(function (error) {
    console.log(error);
  });
  loading.dismiss();
}
  }

