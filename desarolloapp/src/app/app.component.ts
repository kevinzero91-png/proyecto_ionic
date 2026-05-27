import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false
})
export class AppComponent {
  
  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController
  ) {}

  // ==========================================
  // NUEVO: LECTOR DE IDENTIDAD EN TIEMPO REAL
  // ==========================================
  get usuarioActivo() {
    // Busca el paquete de datos en la memoria del navegador
    const data = localStorage.getItem('user_data');
    // Si lo encuentra, lo decodifica. Si no, muestra valores de respaldo.
    return data ? JSON.parse(data) : { nombre: 'Desconocido', email: '...', foto_perfil: 'avatar.png' };
  }

  cerrarSesion() {
    // 1. Ocultamos el menú lateral para que no se quede abierto visualmente
    this.menuCtrl.close();
    
    // 2. Destruimos las credenciales y la identidad de la memoria
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data'); // <-- Añadimos la limpieza de identidad
    
    // 3. Hacemos un salto forzado a la pantalla oscura de Login
    this.navCtrl.navigateRoot('/login');
  }
}