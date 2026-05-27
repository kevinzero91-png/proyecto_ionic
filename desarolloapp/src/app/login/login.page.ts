import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import axios from 'axios';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  authBaseUrl = 'http://localhost:8080/auth/login'; 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ionViewWillEnter() {
    if (this.loginForm) {
      this.loginForm.reset();
    }
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }

  irARecuperar() {
    this.router.navigate(['/recuperar-password']);
  }

  async procesarFormulario() {
    if (this.loginForm.invalid) return;

    const loading = await this.loadingCtrl.create({
      message: 'Estableciendo conexión...',
      spinner: 'crescent',
      cssClass: 'custom-loading'
    });
    await loading.present();

    try {
      const response = await axios({
        method: 'post',
        url: this.authBaseUrl,
        data: this.loginForm.value,
        headers: { 'Content-Type': 'application/json' }
      });

      // --- AQUÍ ATRAPAMOS EL NUEVO PAQUETE DE IDENTIDAD ---
      if (response?.status === 200 && response.data.token) {
        // 1. Guardamos el token de seguridad
        localStorage.setItem('auth_token', response.data.token);
        
        // 2. Guardamos los datos del desarrollador (Nombre, Correo, Foto)
        if (response.data.user) {
          localStorage.setItem('user_data', JSON.stringify(response.data.user));
        }

        // 3. Abrimos las puertas de la terminal
        this.router.navigate(['/inicio']); 
      }
      
    } catch (error: any) {
      console.log('Error de autenticación:', error);
      const alert = await this.alertCtrl.create({
        header: 'Acceso Denegado',
        message: 'Credenciales incorrectas. Verifica tu usuario y contraseña.',
        buttons: ['Entendido'],
        cssClass: 'alert-dark'
      });
      await alert.present();
    } finally {
      loading.dismiss();
    }
  }
}