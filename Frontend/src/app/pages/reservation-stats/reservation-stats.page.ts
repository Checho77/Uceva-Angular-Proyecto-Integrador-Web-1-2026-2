
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticaReservaApi } from '../../interfaces/api.interface';
import { ReservationStatsService } from '../../services/reservation-stats/reservation-stats.service';

@Component({
  selector: 'app-reservation-stats-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reservation-stats.page.html',
  styleUrl: './reservation-stats.page.scss'
})
export class ReservationStatsPage implements OnInit {
  private readonly reservationStatsService = inject(ReservationStatsService);

  estadisticas: EstadisticaReservaApi[] = [];
  cargando = true;
  error = '';

  ngOnInit(): void {
    this.reservationStatsService.getEstadisticas().subscribe({
      next: (estadisticas) => {
        this.estadisticas = estadisticas;
        this.cargando = false;
      },
      error: (error: unknown) => {
        console.error('Error al cargar estadísticas:', error);
        this.error = 'No fue posible cargar las estadísticas. Verifica el backend.';
        this.cargando = false;
      }
    });
  }

  get totalReservas(): number {
    return this.estadisticas.reduce(
      (total, item) => total + Number(item.total_reservas),
      0
    );
  }

  get totalNoCanceladas(): number {
    return this.estadisticas.reduce(
      (total, item) => total + Number(item.reservas_no_canceladas),
      0
    );
  }

  get totalPersonasConfirmadas(): number {
    return this.estadisticas.reduce(
      (total, item) => total + Number(item.personas_confirmadas),
      0
    );
  }

  get ingresosTotales(): number {
    return this.estadisticas.reduce(
      (total, item) => total + Number(item.ingresos_confirmados),
      0
    );
  }

  get maxReservas(): number {
    return Math.max(
      1,
      ...this.estadisticas.map((item) => Number(item.total_reservas))
    );
  }

  porcentajeReservas(total: number): number {
    return Math.min(100, (Number(total) / this.maxReservas) * 100);
  }
}
