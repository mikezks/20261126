# Ticketing owns flight search

Ticketing owns the flight result list and search client. A Ticketing module may import from its own domain or Shared. Luggage owns baggage rules. A Flight Search UI value belongs with the existing Ticketing state.

The workspace enforces the import boundary through `npm run sheriff` from `flight-app/`. The unmodified `sheriff.config.ts` applies the ENT same-domain or Shared dependency rule. A reviewer follows the result count back to the list that owns the data. [ENT reference](https://github.com/angular-architects/flights42/blob/83ecea06cfd789736a469d44f0ce6f9eb2ceeb7f/sheriff.config.ts)
