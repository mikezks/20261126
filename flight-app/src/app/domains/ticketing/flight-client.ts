import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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

  search(route: Route) {
    return this.http.get<Flight[]>('/api/flights', {
      params: { from: route.from, to: route.to },
    });
  }
}
