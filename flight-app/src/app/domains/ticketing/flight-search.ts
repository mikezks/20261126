import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlightClient } from './flight-client';
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
  protected readonly store = inject(FlightStore);
  protected readonly status = signal<'ready' | 'loading' | 'done' | 'error'>('ready');

  protected submit(event: Event, from: string, to: string) {
    event.preventDefault();
    if (!from.trim() || !to.trim() || this.status() === 'loading') return;
    this.status.set('loading');
    this.store.replace([]);
    this.client.search({ from: from.trim(), to: to.trim() })
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
