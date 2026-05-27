import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, NavController, LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RecuperarPasswordPage implements OnInit {
  recuperarForm!: FormGroup;
  resetForm!: FormGroup; // <-- NUEVO FORMULARIO
  
  faseActual = 1; // Controla qué parte del formulario se ve

  recoverUrl = 'http://localhost:8080/auth/recover'; 
  resetUrl = 'http://localhost:8080/auth/reset-password'; // <-- NUEVA URL

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    // Formulario Fase 1
    this.recuperarForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Formulario Fase 2
    this.resetForm = this.formBuilder.group({
      token: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewWillEnter() {
    this.faseActual = 1;
    if (this.recuperarForm) this.recuperarForm.reset();
    if (this.resetForm) this.resetForm.reset();
  }

  volverAlLogin() {
    this.navCtrl.navigateBack('/login');
  }

  // ---- FASE 1: PEDIR EL TOKEN AL BACKEND ----
  async procesarRecuperacion() {
    if (this.recuperarForm.invalid) return;

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando protocolo...', spinner: 'crescent', cssClass: 'custom-loading'
    });
    await loading.present();

    try {
      const response = await axios.post(this.recoverUrl, this.recuperarForm.value);
      if (response?.status === 200) {
        // En lugar de salir, pasamos a la Fase 2
        this.faseActual = 2; 
        const alert = await this.alertCtrl.create({
          header: 'Protocolo Autorizado',
          message: 'Se ha generado un token. Para desarrollo, cópialo desde tu base de datos.',
          buttons: ['Entendido'],
          cssClass: 'alert-dark'
        });
        await alert.present();
      }
    } catch (error: any) {
      let msg = error.response?.status === 404 ? 'No encontramos a ningún desarrollador con este correo.' : 'Error al procesar la solicitud.';
      const alert = await this.alertCtrl.create({ header: 'Denegado', message: msg, buttons: ['OK'], cssClass: 'alert-dark' });
      await alert.present();
    } finally {
      loading.dismiss();
    }
  }

  // ---- FASE 2: ENVIAR EL TOKEN Y LA NUEVA CONTRASEÑA ----
  async procesarNuevaPassword() {
    if (this.resetForm.invalid) return;

    const loading = await this.loadingCtrl.create({
      message: 'Reconfigurando credenciales...', spinner: 'crescent', cssClass: 'custom-loading'
    });
    await loading.present();

    try {
      const response = await axios.post(this.resetUrl, this.resetForm.value);
      if (response?.status === 200) {
        const alert = await this.alertCtrl.create({
          header: 'Acceso Restaurado',
          message: response.data.mensaje,
          buttons: ['Entendido'],
          cssClass: 'alert-dark'
        });
        await alert.present();
        this.volverAlLogin(); // Éxito total, volvemos a la terminal de inicio
      }
    } catch (error: any) {
      let msg = error.response?.status === 404 ? 'Token inválido o expirado.' : 'Error al restablecer.';
      const alert = await this.alertCtrl.create({ header: 'Fallo de Seguridad', message: msg, buttons: ['OK'], cssClass: 'alert-dark' });
      await alert.present();
    } finally {
      loading.dismiss();
    }
  }
}