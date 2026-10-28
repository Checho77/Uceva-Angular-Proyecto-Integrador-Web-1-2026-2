
import { Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

interface NavbarConfig {
  url: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  navbarConfig: NavbarConfig[] = [];

  readonly clientConfig: NavbarConfig[] = [
    { url: '/client/events', label: 'Eventos', icon: 'calendar3' },
    { url: '/client/event-catalog', label: 'Catálogo', icon: 'collection' },
    { url: '/client/reservations', label: 'Reservaciones', icon: 'ticket-perforated' }
  ];

  readonly agentConfig: NavbarConfig[] = [
    { url: '/agent/events', label: 'Eventos', icon: 'calendar3' },
    { url: '/agent/create-event', label: 'Crear Evento', icon: 'calendar-plus' },
    { url: '/agent/reservations', label: 'Reservaciones', icon: 'ticket-perforated' },
    { url: '/agent/reservation-stats', label: 'Estadísticas', icon: 'bar-chart-line' }
  ];

  private readonly router = inject(Router);

  constructor() {
    this.setNavbarConfig();
  }

  setNavbarConfig(): void {
    switch (this.getRole()) {
      case 'client':
        this.navbarConfig = this.clientConfig;
        break;

      case 'agent':
        this.navbarConfig = this.agentConfig;
        break;

      default:
        this.navbarConfig = [];
        break;
    }
  }

  getRole(): 'client' | 'agent' | 'admin' {
    const url = this.router.url;

    if (url.includes('/client')) {
      return 'client';
    }

    if (url.includes('/agent')) {
      return 'agent';
    }

    if (url.includes('/admin')) {
      return 'admin';
    }

    return 'client';
  }

  cerrarSesion(): void {
    void this.router.navigate(['/login']);
  }
}
