import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Flight, FlightClient } from './flight-client';

@Component({
  selector: 'app-flight-search',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './flight-search.html',
  styleUrl: './flight-search.scss',
})
export class FlightSearch {
  private readonly client = inject(FlightClient);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly flights = signal<Flight[]>([]);
  protected readonly status = signal<'ready' | 'loading' | 'done' | 'error'>('ready');

  protected submit(event: Event, from: string, to: string) {
    event.preventDefault();
    if (!from.trim() || !to.trim() || this.status() === 'loading') return;
    this.status.set('loading');
    this.flights.set([]);
    this.client.search({ from: from.trim(), to: to.trim() })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: flights => {
          this.flights.set(flights);
          this.status.set('done');
        },
        error: () => this.status.set('error'),
      });
  }
}
