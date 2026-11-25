import { createServer } from 'node:http';

const flights = [
  { id: 201, number: 'OS201', from: 'VIE', to: 'LHR' },
  { id: 202, number: 'OS202', from: 'LHR', to: 'VIE' },
];

const server = createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  response.setHeader('content-type', 'application/json');
  if (request.method !== 'GET' || url.pathname !== '/api/flights') {
    response.writeHead(404).end(JSON.stringify({ error: 'Unknown route' }));
    return;
  }
  const { searchParams } = url;
  const matches = flights.filter(flight =>
    flight.from === searchParams.get('from') && flight.to === searchParams.get('to')
  );
  response.end(JSON.stringify(matches));
});

server.listen(4301, '127.0.0.1', () => console.log('Flight fixtures on http://127.0.0.1:4301'));
