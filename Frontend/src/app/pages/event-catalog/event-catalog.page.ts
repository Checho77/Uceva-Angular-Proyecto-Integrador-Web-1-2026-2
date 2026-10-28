
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventoApi } from '../../interfaces/api.interface';
import { EventCatalogService } from '../../services/event-catalog/event-catalog.service';

@Component({
  selector: 'app-event-catalog-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-catalog.page.html',
  styleUrl: './event-catalog.page.scss'
})
export class EventCatalogPage implements OnInit {
  private readonly eventCatalogService = inject(EventCatalogService);

  eventos: EventoApi[] = [];
  cargando = true;
  error = '';

  readonly imagenRespaldo =
    'https://placehold.co/800x450?text=Evento';

  ngOnInit(): void {
    this.eventCatalogService.getEventos().subscribe({
      next: (eventos) => {
        this.eventos = eventos;
        this.cargando = false;
      },
      error: (error: unknown) => {
        console.error('Error al cargar eventos:', error);
        this.error = 'No fue posible cargar los eventos. Verifica el backend.';
        this.cargando = false;
      }
    });
  }

  usarImagenRespaldo(event: Event): void {
    const imagen = event.target as HTMLImageElement;
    imagen.onerror = null;
    imagen.src = this.imagenRespaldo;
  }

  claseEstado(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'activo':
        return 'text-bg-success';
      case 'inactivo':
        return 'text-bg-secondary';
      case 'finalizado':
        return 'text-bg-dark';
      default:
        return 'text-bg-primary';
    }
  }
}
