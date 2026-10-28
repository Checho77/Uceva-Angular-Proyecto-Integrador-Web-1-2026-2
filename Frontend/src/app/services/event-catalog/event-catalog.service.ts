
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventoApi } from '../../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class EventCatalogService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/eventos';

  getEventos(): Observable<EventoApi[]> {
    return this.http.get<EventoApi[]>(this.apiUrl);
  }
}
