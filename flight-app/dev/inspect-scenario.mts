import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';
import { fileURLToPath } from 'node:url';

const [action, scenario = 'error_then_success', sessionId] = process.argv.slice(2);
if (action !== 'list' && action !== 'call') {
  throw new Error('Choose list or call');
}
const client = new Client({ name: 'flight-tool-inspector', version: '1.0.0' });
const server = fileURLToPath(new URL('./scenario-server.mts', import.meta.url));
try {
  await client.connect(new StdioClientTransport({ command: process.execPath, args: [server] }));
  if (action === 'list') {
    console.log(JSON.stringify(await client.listTools(), null, 2));
  } else {
    const result = await client.callTool({
      name: 'activate_flight_scenario', arguments: { scenario, ...(sessionId ? { sessionId } : {}) },
    });
    console.log(JSON.stringify(result, null, 2));
    if (result.isError) process.exitCode = 1;
  }
} finally {
  await client.close();
}
