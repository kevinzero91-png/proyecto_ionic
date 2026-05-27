import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/usuarios'; // Asegúrate de que tu ruta sea correcta

  getUsuarios() {
    return axios.get(this.apiUrl);
  }
}