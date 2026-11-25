import { HttpClient } from '@angular/common/http';
import { DOCUMENT, inject, Injectable } from '@angular/core';

export interface Route {
  from: string;
  to: string;
}

export interface Flight extends Route {
  id: number;
  number: string;
}

@Injectable({ providedIn: 'root' })
export class FlightClient {
  private readonly http = inject(HttpClient);

  private readonly document = inject(DOCUMENT);

  search(route: Route) {
    const params: Record<string, string> = { from: route.from, to: route.to };
    const session = new URL(this.document.location.href).searchParams.get('session');
    if (session) params['session'] = session;
    return this.http.get<Flight[]>('/api/flights', { params });
  }
}
