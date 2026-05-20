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
  baseUrl:string = "http://localhost:8080/categorias";
  public categoria!: FormGroup;
  @Input() id_categoria: number | undefined;
  private editarDatos: any = null;
   mensajes_validacion:any = {

    'nombre' : [
        {type : 'required' , message : 'Nombre(s) requeridos.'},
    ],
}

 constructor(
    private formBuilder : FormBuilder,
    private alert : AlertController,
    private modalCtrl: ModalController
) { }

ngOnInit() {
    if (this.id_categoria !== undefined) {
        this.getDetalles();
    }
    this.formulario();
}

private formulario() {
    this.categoria = this.formBuilder.group({
    nombre: ['', [Validators.required]],
    })
}
async guardarDatos() {
    try {
        const categoria: any = this.categoria?.value;
        if (this.id_categoria === undefined) {
            const response = await axios({
              method: 'post',
              url: this.baseUrl,
              data: categoria,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 100-token'
              }
            }).then((response) => {
                if (response?.status == 201) {
                    this.alertGuardado(response.data.id, 'La categoria con nombre ' + response.data.nombre + ' ha sido registrada');
                }
            }).catch((error) => {
                if (error?.response?.status == 422) {
                    this.alertGuardado(categoria.id, error?.response?.data[0]?.message, "Error");
                }
                if (error?.response?.status == 500) {
                    this.alertGuardado(categoria.id, "No puedes eliminar porque tiene relaciones con otra tabla", "Error");
                }
            });
        } else {
            const response = await axios({
              method: 'put',
              url: this.baseUrl + '/' + this.id_categoria,
              data: categoria,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 100-token'
              }
            }).then((response) => {
                if (response?.status == 200) {
                    this.alertGuardado(response.data.id, 'La categoria con nombre ' + response.data.nombre + ' ha sido actualizada');
                }
            }).catch((error) => {
                if (error?.response?.status == 422) {
                    this.alertGuardado(categoria.id, error?.response?.data[0]?.message, "Error");
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
    const response = await axios({
      method: 'get',
      url: this.baseUrl + "/" + this.id_categoria,
      withCredentials: true,
      headers: {
          'Accept': 'application/json'
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
        console.log(error);
    });
}
}
