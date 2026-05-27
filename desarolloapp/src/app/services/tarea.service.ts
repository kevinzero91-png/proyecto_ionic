import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  // Yii2 automáticamente pluraliza el nombre a "tareas"
  private apiUrl = 'http://localhost:8080/tareas'; 

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

  // <--- NUEVA FUNCIÓN PARA OBTENER TODAS LAS TAREAS (Para el Dashboard) --->
  getTareas() {
    return axios.get(this.apiUrl);
  }

  // Función para obtener las tareas de un proyecto específico
  getTareasPorProyecto(id_proyecto: number) {
    return axios.get(`${this.apiUrl}?id_proyecto=${id_proyecto}`);
  }
  
  // <--- NUEVA FUNCIÓN PARA CREAR TAREA --->
  crearTarea(tarea: any) {
    return axios.post(this.apiUrl, tarea);
  }
  
  // <--- NUEVA FUNCIÓN PARA ELIMINAR TAREA --->
  eliminarTarea(id_tarea: number) {
    return axios.delete(`${this.apiUrl}/${id_tarea}`);
  }
  
  // Obtener una sola tarea para llenar el formulario
  getTarea(id_tarea: number) {
    return axios.get(`${this.apiUrl}/${id_tarea}`);
  }

  // Guardar los cambios (PUT)
  actualizarTarea(id_tarea: number, tarea: any) {
    return axios.put(`${this.apiUrl}/${id_tarea}`, tarea);
  }
}