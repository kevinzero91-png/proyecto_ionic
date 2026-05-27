import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule, LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class PerfilPage implements OnInit {
  perfilForm!: FormGroup;
  updateUrl = 'http://localhost:8080/auth/update-profile';
  uploadUrl = 'http://localhost:8080/auth/upload-avatar'; 
  
  fotoActual = 'https://ionicframework.com/docs/img/demos/avatar.svg'; 
  emailOriginal = '';

  constructor(
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.perfilForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ionViewWillEnter() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const data = localStorage.getItem('user_data');
    if (data) {
      const user = JSON.parse(data);
      this.emailOriginal = user.email;
      
      this.perfilForm.patchValue({
        nombre: user.nombre,
        email: user.email
      });

      if (user.foto_perfil && user.foto_perfil !== 'default-avatar.png') {
        this.fotoActual = 'http://localhost:8080/uploads/avatars/' + user.foto_perfil;
      } else {
        this.fotoActual = 'https://ionicframework.com/docs/img/demos/avatar.svg';
      }
    }
  }

  async guardarCambios() {
    if (this.perfilForm.invalid) return;

    const loading = await this.loadingCtrl.create({
      message: 'Actualizando perfil...', spinner: 'crescent', cssClass: 'custom-loading'
    });
    await loading.present();

    try {
      const payload = {
        email_actual: this.emailOriginal,
        nombre: this.perfilForm.value.nombre,
        email: this.perfilForm.value.email
      };

      const response = await axios.post(this.updateUrl, payload);

      if (response?.status === 200) {
        localStorage.setItem('user_data', JSON.stringify(response.data.user));
        this.emailOriginal = response.data.user.email; 
        
        const alert = await this.alertCtrl.create({
          header: 'Perfil Actualizado', message: 'Los datos de tu cuenta han sido guardados.', buttons: ['OK'], cssClass: 'alert-dark'
        });
        await alert.present();
      }
    } catch (error: any) {
      const alert = await this.alertCtrl.create({ header: 'Error', message: 'No se pudo actualizar el perfil.', buttons: ['OK'], cssClass: 'alert-dark' });
      await alert.present();
    } finally {
      loading.dismiss();
    }
  }

  // ==========================================
  // SISTEMA DE CARGA NATIVA (ULTRARRÁPIDA)
  // ==========================================

  cambiarFoto() {
    document.getElementById('avatarInput')?.click();
  }

  // Atrapamos el archivo físico y lo enviamos directamente
  async seleccionarArchivo(event: any) {
    // CORRECCIÓN VITAL: El asegura que tomamos el archivo real y no una lista vacía
    const archivoFisico = event.target.files?.[0]; 
    if (!archivoFisico) return; 

    const loading = await this.loadingCtrl.create({
      message: 'Subiendo fotografía...', spinner: 'crescent', cssClass: 'custom-loading'
    });
    await loading.present();

    try {
      // 1. Empaquetamos en formato nativo Multipart (como dicta tu manual)
      const formData = new FormData();
      formData.append('foto', archivoFisico);
      formData.append('email_actual', this.emailOriginal); 

      // 2. Enviamos SIN forzar encabezados para que Axios maneje el límite (boundary)
      const response = await axios.post(this.uploadUrl, formData);

      // 3. Procesamos la respuesta del servidor
      if (response?.data?.status === 'success' || response?.status === 200) {
        
        // Actualizamos la memoria caché del navegador
        const userDataStr = localStorage.getItem('user_data');
        if (userDataStr) {
          const user = JSON.parse(userDataStr);
          user.foto_perfil = response.data.foto_perfil;
          localStorage.setItem('user_data', JSON.stringify(user));
        }

        // Actualizamos la foto en pantalla al instante
        this.fotoActual = response.data.url;

        const alert = await this.alertCtrl.create({
          header: 'Operación Exitosa', message: 'Tu fotografía ha sido actualizada al instante.', buttons: ['OK'], cssClass: 'alert-dark'
        });
        await alert.present();
      }
    } catch (error: any) {
      console.error(error);
      const msg = error.response?.data?.mensaje || 'Error de transferencia con el servidor.';
      const alert = await this.alertCtrl.create({
        header: 'Fallo al Subir', message: msg, buttons: ['OK'], cssClass: 'alert-dark'
      });
      await alert.present();
    } finally {
      loading.dismiss();
      // Limpiamos el selector para poder subir la misma foto si se desea
      event.target.value = null; 
    }
  }
}