import { randomUUID } from 'node:crypto';
import { createServer } from 'node:http';
import { scenarioNames } from './scenario-contract.mts';

const flights = [
  { id: 201, number: 'OS201', from: 'VIE', to: 'LHR' },
  { id: 202, number: 'OS202', from: 'LHR', to: 'VIE' },
];

const sessions = new Map();
const server = createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  const params = url.searchParams;
  const sessionId = params.get('session');
  function reply(status, value) {
    response.writeHead(status, { 'content-type': 'application/json', 'cache-control': 'no-store' });
    response.end(JSON.stringify(value));
  }

  if (request.method === 'POST' && url.pathname === '/api/scenarios') {
    const scenario = params.get('scenario');
    if (!scenarioNames.includes(scenario)) return reply(400, { error: 'Unknown scenario' });
    if (sessionId !== null && !sessions.has(sessionId)) return reply(404, { error: 'Unknown session' });
    const id = sessionId ?? randomUUID();
    sessions.set(id, { scenario, searches: 0 });
    return reply(200, { scenario, sessionId: id, appUrl: 'http://localhost:4200/?session=' + id });
  }
  if (request.method !== 'GET' || url.pathname !== '/api/flights') {
    return reply(404, { error: 'Unknown route' });
  }
  if (!params.get('from') || !params.get('to')) return reply(400, { error: 'Route required' });
  const session = sessions.get(sessionId);
  if (sessionId !== null && !session) return reply(404, { error: 'Unknown session' });
  if (session) {
    session.searches++;
    if (session.scenario === 'error_then_success' && session.searches === 1) {
      return reply(503, { error: 'Temporary fixture failure' });
    }
    if (session.scenario === 'empty') return reply(200, []);
  }
  const matches = flights.filter(flight =>
    flight.from === params.get('from') && flight.to === params.get('to')
  );
  return reply(200, matches);
});

server.listen(4301, '127.0.0.1', () => console.log('Flight fixtures on http://127.0.0.1:4301'));
