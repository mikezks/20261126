import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlightClient, type Route } from './flight-client';
import { FlightStore } from './flight-store';

@Component({
  selector: 'app-flight-search',
  providers: [FlightStore],
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './flight-search.html',
  styleUrl: './flight-search.scss',
})
export class FlightSearch {
  private readonly client = inject(FlightClient);
  private readonly destroyRef = inject(DestroyRef);
  private lastRoute?: Route;
  protected readonly store = inject(FlightStore);
  protected readonly status = signal<'ready' | 'loading' | 'done' | 'error'>('ready');

  protected submit(event: Event, from: string, to: string) {
    event.preventDefault();
    if (!from.trim() || !to.trim()) return;
    this.search({ from: from.trim(), to: to.trim() });
  }

  protected retry() {
    if (this.lastRoute) this.search(this.lastRoute);
  }

  private search(route: Route) {
    if (this.status() === 'loading') return;
    this.lastRoute = route;
    this.status.set('loading');
    this.store.replace([]);
    this.client.search(route)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: flights => {
          this.store.replace(flights);
          this.status.set('done');
        },
        error: () => this.status.set('error'),
      });
  }
}
