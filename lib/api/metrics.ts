type ApiMetric = {
  endpoint: string;
  timestamp: string;
};

const metrics: ApiMetric[] = [];

export function recordApiRequest(endpoint: string) {
  metrics.push({
    endpoint,
    timestamp: new Date().toISOString(),
  });
}

export function getApiMetrics() {
  return [...metrics];
}
