import { activateScenario } from './scenario-client.mts';
import { scenarioSchema } from './scenario-contract.mts';

const [action, supplied, sessionId] = process.argv.slice(2);
const parsed = scenarioSchema.safeParse(supplied);
if (action !== 'activate' || !parsed.success || process.argv.length > 5) {
  console.error('Usage: npm run scenario -- activate <matches|empty|error_then_success> [session-id]');
  process.exitCode = 1;
} else {
  try {
    console.log(JSON.stringify(await activateScenario(parsed.data, sessionId)));
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
