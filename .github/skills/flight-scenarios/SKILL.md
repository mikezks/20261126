---
name: flight-scenarios
description: Use when reproducing a flight search failure, empty result or recovery against the local fixture.
---

From `flight-app/`, start the fixture service with `npm run fixtures` and the Angular app with `npm start` in separate terminals. Use the ordinary CLI, which calls the local HTTP service directly. For a new session, run `npm run scenario -- activate error_then_success`. Use the returned app URL, search VIE to LHR, then retry the same route. Read the actual status codes and flight number in the browser. To reset just that session, append its returned ID to the activation command. Report which session you used and what you observed.
