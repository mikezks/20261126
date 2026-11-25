import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Flight } from './flight-client';

export const FlightStore = signalStore(
  withState<{ flights: Flight[] }>({ flights: [] }),
  withComputed(({ flights }) => ({
    hasFlights: computed(() => flights().length > 0),
  })),
  withMethods(store => ({
    replace(flights: Flight[]) {
      patchState(store, { flights });
    },
  })),
);
