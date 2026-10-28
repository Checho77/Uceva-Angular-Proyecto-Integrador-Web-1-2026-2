
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadisticaReservaApi } from '../../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationStatsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl =
    'http://localhost:3000/api/reservas/estadisticas';

  getEstadisticas(): Observable<EstadisticaReservaApi[]> {
    return this.http.get<EstadisticaReservaApi[]>(this.apiUrl);
  }
}
