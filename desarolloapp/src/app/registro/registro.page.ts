import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController, LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule] // <-- ReactiveFormsModule inyectado
})
export class RegistroPage implements OnInit {
  registroForm!: FormGroup;
  // URL de tu backend para el registro
  registerUrl = 'http://localhost:8080/auth/register'; 

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      // Añadimos el validador estricto de email
      email: ['', [Validators.required, Validators.email]], 
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  volverAlLogin() {
    this.navCtrl.navigateBack('/login');
  }

  async procesarRegistro() {
    if (this.registroForm.invalid) return;

    const loading = await this.loadingCtrl.create({
      message: 'Encriptando credenciales...',
      spinner: 'crescent',
      cssClass: 'custom-loading'
    });
    await loading.present();

    try {
      const response = await axios({
        method: 'post',
        url: this.registerUrl,
        data: this.registroForm.value,
        headers: { 'Content-Type': 'application/json' }
      });

      if (response?.status === 200) {
        const alert = await this.alertCtrl.create({
          header: 'Reclutamiento Exitoso',
          message: 'El desarrollador ha sido registrado. Ya puede iniciar sesión en la terminal.',
          buttons: ['Entendido'],
          cssClass: 'alert-dark'
        });
        await alert.present();
        
        // Lo devolvemos al login para que entre con su nueva cuenta
        this.navCtrl.navigateBack('/login');
      }
      
    } catch (error: any) {
      console.log('Error de registro:', error);
      
      // Manejamos los errores que programamos en Yii2
      let mensajeError = 'Hubo un error al intentar registrar al usuario.';
      if (error.response?.status === 409) {
        mensajeError = error.response.data.mensaje || 'El usuario o correo ya están en uso.';
      } else if (error.response?.status === 400) {
        mensajeError = 'Faltan datos obligatorios.';
      }

      const alert = await this.alertCtrl.create({
        header: 'Operación Fallida',
        message: mensajeError,
        buttons: ['OK'],
        cssClass: 'alert-dark'
      });
      await alert.present();
    } finally {
      loading.dismiss();
    }
  }
}