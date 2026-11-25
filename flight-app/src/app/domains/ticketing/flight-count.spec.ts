import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FlightSearch } from './flight-search';

it.each([0, 2])('FS-03 displays the count for %i matching flights', async count => {
  TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
  const http = TestBed.inject(HttpTestingController);
  const fixture = TestBed.createComponent(FlightSearch);
  await fixture.whenStable();
  const view: HTMLElement = fixture.nativeElement;
  view.querySelector<HTMLInputElement>('#from')!.value = 'VIE';
  view.querySelector<HTMLInputElement>('#to')!.value = 'LHR';
  view.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  const flights = [201, 203].slice(0, count).map(id => ({
    id, number: 'OS' + id, from: 'VIE', to: 'LHR',
  }));
  http.expectOne(req => req.url === '/api/flights').flush(flights);
  await fixture.whenStable();
  expect(view.querySelector('[data-testid="flight-count"]')?.textContent?.trim())
    .toBe('Matching flights: ' + count);
  http.verify();
});
