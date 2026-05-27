import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';

import axios from 'axios';

@Component({
  selector: 'app-categoria-crear',
  templateUrl: './categoria-crear.page.html',
  styleUrls: ['./categoria-crear.page.scss'],
  standalone: false
})
export class CategoriaCrearPage implements OnInit {
  baseUrl: string = "http://localhost:8080/categorias";
  public categoria!: FormGroup;
  @Input() id_categoria: number | undefined;
  private editarDatos: any = null;
  mensajes_validacion: any = {
    'nombre': [
        { type: 'required', message: 'Nombre(s) requeridos.' },
    ],
  }

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    if (this.id_categoria !== undefined) {
        this.getDetalles();
    }
    this.formulario();
  }

  private formulario() {
    this.categoria = this.formBuilder.group({
        // El validador 'Validators.required' evita que se envíen campos vacíos
        nombre: ['', [Validators.required]] 
    });
  }

  async guardarDatos() {
    // Extraemos la llave maestra de la memoria
    const tokenReal = localStorage.getItem('auth_token');

    try {
        const categoria: any = this.categoria?.value;
        
        if (this.id_categoria === undefined) {
            // MÉTODO POST (CREAR)
            const response = await axios({
              method: 'post',
              url: this.baseUrl,
              data: categoria,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenReal}` // <-- Inyectamos aquí
              }
            }).then((response) => {
                if (response?.status == 201 || response?.status == 200) {
                   this.alertGuardado(response.data?.id || 0, 'La categoría "' + categoria.nombre + '" ha sido registrada');
                }
            }).catch((error) => {
                if (error?.response?.status == 422) {
                    this.alertGuardado(categoria.id, error?.response?.data?.message, "Error");
                } else if (error?.response?.status == 401) {
                    this.alertGuardado(categoria.id, "Acceso Denegado. Tu sesión ha expirado.", "Error");
                } else if (error?.response?.status == 500) {
                    this.alertGuardado(categoria.id, "Error en el servidor al intentar guardar.", "Error");
                }
            });
        } else {
            // MÉTODO PUT (EDITAR)
            const response = await axios({
              method: 'put',
              url: this.baseUrl + '/' + this.id_categoria,
              data: categoria,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${tokenReal}` // <-- Y aquí también
              }
            }).then((response) => {
                if (response?.status == 200) {
                   this.alertGuardado(response.data?.id || 0, 'La categoría "' + categoria.nombre + '" ha sido actualizada');
                }
            }).catch((error) => {
                if (error?.response?.status == 422) {
                    this.alertGuardado(categoria.id, error?.response?.data?.message, "Error");
                } else if (error?.response?.status == 401) {
                    this.alertGuardado(categoria.id, "Acceso Denegado. Tu sesión ha expirado.", "Error");
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
  }

  async alertGuardado(id: number, mensaje: string, titulo: string = 'Éxito') {
    const alert = await this.alert.create({
        header: titulo,
        message: mensaje,
        buttons: ['OK'],
    });
    await alert.present();
    if (titulo === 'Éxito') {
        this.modalCtrl.dismiss();
    }
  }

  public getError(controlName: string) {
    let errors: any[] = [];
    const control = this.categoria.get(controlName);
    if (control?.touched && control?.errors != null) {
        errors = JSON.parse(JSON.stringify(control?.errors));
    }
    return errors;
  }

  async getDetalles() {
    // Extraemos la llave para poder consultar los datos a editar
    const tokenReal = localStorage.getItem('auth_token');

    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.id_categoria,
      withCredentials: true,
      headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${tokenReal}` // <-- Inyectamos en la consulta
      }
    }).then((response) => {
        this.editarDatos = response.data;
        Object.keys(this.editarDatos).forEach((key: any) => {
            const control = this.categoria.get(String(key));
            if (control !== null) {
                control.markAsTouched();
                control.patchValue(this.editarDatos[key]);
            }
        })
    }).catch(function (error) {
        console.log("Error al cargar detalles:", error);
    });
  }
}