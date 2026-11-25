---
name: ngrx-signal-store
description: Use when changing state or derived values in the existing Ticketing NgRx SignalStore.
---

Locate the feature that owns the data and read the closest store implementation. In this repo, inspect `flight-app/src/app/domains/ticketing/flight-store.ts` and its `hasFlights` computed signal. Derive a new view value from the existing state and keep one writable source of truth. Keep HTTP in the client. For a display-only wording change, edit the view.

Trace the component binding back to its store. From `flight-app/`, run `npm run test:count`, `npm run test:search` and `npm run sheriff`. Report the criterion, file and observed output.
