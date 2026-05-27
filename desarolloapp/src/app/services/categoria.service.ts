import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/categorias'; // Asegúrate de que la ruta sea la correcta en tu Yii2
  getCategorias() { return axios.get(this.apiUrl); }
}