import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../../environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  // Ajusta esta URL al puerto y ruta donde corre tu API de Yii2
 private apiUrl = 'http://localhost:8080/proyectos';

  constructor() { }

  // <--- FUNCIÓN AYUDANTE PARA INYECTAR EL TOKEN --->
  // Esto arma la configuración de seguridad para todas tus peticiones
  private getConfig() {
    const tokenReal = localStorage.getItem('auth_token');
    return {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${tokenReal}`
      }
    };
  }

  // C - Crear
  crearProyecto(datos: any) {
    // Solo le pasamos this.getConfig() como tercer parámetro
    return axios.post(this.apiUrl, datos, this.getConfig());
  }

  // R - Leer todos (Listado)
  getProyectos() {
    // Le pasamos this.getConfig() como segundo parámetro
    return axios.get(this.apiUrl, this.getConfig());
  }

  // <--- NUEVA FUNCIÓN PARA OBTENER UN SOLO PROYECTO --->
  getProyecto(id_proyecto: number) {
    return axios.get(`${this.apiUrl}/${id_proyecto}`, this.getConfig());
  }

  // <--- NUEVA FUNCIÓN PARA EDITAR --->
  actualizarProyecto(id_proyecto: number, proyecto: any) {
    return axios.put(`${this.apiUrl}/${id_proyecto}`, proyecto, this.getConfig());
  }

  // <--- NUEVA FUNCIÓN PARA ELIMINAR --->
  eliminarProyecto(id_proyecto: number) {
    return axios.delete(`${this.apiUrl}/${id_proyecto}`, this.getConfig());
  }
}