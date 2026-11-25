import { Component } from '@angular/core';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.html',
  styleUrl: './flight-search.scss',
})
export class FlightSearch {
  protected submit(event: Event) {
    event.preventDefault();
  }
}
