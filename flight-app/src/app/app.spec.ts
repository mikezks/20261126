import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { App } from './app';

it('opens the flight search', async () => {
  TestBed.configureTestingModule({ providers: [provideHttpClient()] });
  const fixture = TestBed.createComponent(App);
  await fixture.whenStable();
  const root: HTMLElement = fixture.nativeElement;
  expect(root.querySelector('h1')?.textContent).toBe('Flight Search');
});
