# Flight Search

A passenger wants to search for a chosen route and read matching flights. Use the existing search contract and retain accessible origin and destination labels. The endpoint and the response shape are fixed for this change.

| ID | Starting state | Action | Expected observation |
|---|---|---|---|
| FS-01 | The form is ready with a valid route | Change a field | The field changes locally. Zero search requests are sent. |
| FS-02 | The form contains VIE and LHR | Submit once | Exactly one GET search contains the selected origin and destination. The returned flight is displayed. |

The request cost and explicit Search action favour submission over searching on every keypress. Empty destination behaviour is still open. [Reference contract](../workshop/flight-contract.md)
