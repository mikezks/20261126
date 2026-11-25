import { z } from 'zod';

export const scenarioNames = ['matches', 'empty', 'error_then_success'] as const;
export const scenarioSchema = z.enum(scenarioNames);
export type Scenario = z.infer<typeof scenarioSchema>;

export const sessionSchema = z.object({
  scenario: scenarioSchema,
  sessionId: z.uuid(),
  appUrl: z.url(),
});
