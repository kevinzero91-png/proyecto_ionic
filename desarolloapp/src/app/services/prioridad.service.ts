import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({ providedIn: 'root' })
export class PrioridadService {
  private apiUrl = 'http://localhost:8080/prioridads'; // Ojo aquí con el plural que genera Yii2 por defecto, a veces es "prioridads" o "prioridades"
  getPrioridades() { return axios.get(this.apiUrl); }
}