export type PolicyAccountingState = {
  spent: number;
  windowStartedAt: string;
};

const DAILY_WINDOW_MS = 24 * 60 * 60 * 1000;

const accounting = new Map<string, PolicyAccountingState>();

function getState(agentId: string): PolicyAccountingState {
  const existing = accounting.get(agentId);
  const now = Date.now();

  if (
    !existing ||
    now - new Date(existing.windowStartedAt).getTime() >= DAILY_WINDOW_MS
  ) {
    const fresh = {
      spent: 0,
      windowStartedAt: new Date().toISOString(),
    };

    accounting.set(agentId, fresh);
    return fresh;
  }

  return existing;
}

export function getPolicyAccounting(agentId: string) {
  return getState(agentId);
}

export function recordPolicySpend(
  agentId: string,
  amount: number
) {
  const state = getState(agentId);

  state.spent += amount;

  accounting.set(agentId, state);

  return state;
}
