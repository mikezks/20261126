import { Component } from '@angular/core';
import { FlightSearch } from './domains/ticketing/flight-search';

@Component({
  selector: 'app-root',
  imports: [FlightSearch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
