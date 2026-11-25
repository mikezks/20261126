# Flight Search

A passenger wants to look up flights from Vienna (VIE) to London Heathrow (LHR). The prototype has two editable fields, a Search action and one result area.

| State | What the passenger sees |
|---|---|
| Ready | Origin, destination and a Search button |
| Empty | The entered route and a message that no flights matched |
| Temporary failure | The entered route, an error message and a Retry action |

**Decision to make.** “Update the search when the route changes” leaves open whether typing, submitting, or both should contact the service. Agree on the trigger before implementing it.

The workshop client accepts `{ from: string, to: string }`. Its `search(route)` method returns an observable list of flights. The search request is `GET /api/flights?from=VIE&to=LHR`. The synthetic one-flight fixture returns `{ "id": 201, "number": "OS201", "from": "VIE", "to": "LHR" }`. The app calls its own origin. A local development proxy forwards the request to the fixture service. The client and the runnable fixture arrive in the second starter.

This small adapter keeps the origin/destination fields of the upstream Flight example. [Reference model](https://github.com/mikezks/20261015a/blob/e5b4548fa941265b21bb6b785ff99fcec8c9c275/apps/flight42/src/app/booking/model/flight.ts)
