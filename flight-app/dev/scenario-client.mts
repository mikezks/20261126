import { sessionSchema, type Scenario } from './scenario-contract.mts';

export async function activateScenario(scenario: Scenario, sessionId?: string) {
  const url = new URL('http://127.0.0.1:4301/api/scenarios');
  url.searchParams.set('scenario', scenario);
  if (sessionId !== undefined) url.searchParams.set('session', sessionId);
  const response = await fetch(url, { method: 'POST' });
  if (!response.ok) {
    throw new Error('Fixture activation failed (' + response.status + '): ' + await response.text());
  }
  return sessionSchema.parse(await response.json());
}
