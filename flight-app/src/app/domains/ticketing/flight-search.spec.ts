import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Flight, Route } from './flight-client';
import { FlightSearch } from './flight-search';

it('FS-01 and FS-02: editing sends zero requests, submitting sends one', async () => {
  TestBed.configureTestingModule({ providers: [provideHttpClient(), provideHttpClientTesting()] });
  const http = TestBed.inject(HttpTestingController);
  const fixture = TestBed.createComponent(FlightSearch);
  await fixture.whenStable();
  const view: HTMLElement = fixture.nativeElement;
  const route: Route = { from: 'VIE', to: 'LHR' };
  for (const field of ['from', 'to'] as const) {
    const input = view.querySelector<HTMLInputElement>('#' + field)!;
    input.value = route[field];
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
  http.expectNone(request => request.url === '/api/flights', 'search during editing');
  view.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  const search = http.expectOne(request => request.method === 'GET' && request.url === '/api/flights'
    && request.params.get('from') === route.from && request.params.get('to') === route.to,
    'one submitted search');
  const flight: Flight = { id: 201, number: 'OS201', ...route };
  search.flush([flight]);
  await fixture.whenStable();
  expect(view.textContent).toContain('OS201');
  http.verify();
});
