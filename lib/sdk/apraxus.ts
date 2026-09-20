export type ApraxusClientOptions = {
  baseUrl?: string;
  apiKey?: string;
};

export class ApraxusClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(options: ApraxusClientOptions = {}) {
    this.baseUrl = options.baseUrl ?? "/api/v1";
    this.apiKey = options.apiKey;
  }

  private async request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(this.apiKey
          ? { Authorization: `Bearer ${this.apiKey}` }
          : {}),
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error ?? "Apraxus API request failed");
    }

    return data;
  }

  async health() {
    return this.request("/health");
  }

  async createPayment(payment: {
    token: string;
    amount: string;
    recipient: string;
    agentId: string;
  }) {
    return this.request("/payments", {
      method: "POST",
      body: JSON.stringify(payment),
    });
  }

  async getQuote(quote: {
    tokenIn: string;
    tokenOut: string;
    amountIn: string;
  }) {
    return this.request("/quotes", {
      method: "POST",
      body: JSON.stringify(quote),
    });
  }

  async createExecution(execution: {
    agentId: string;
    wallet: string;
    token: string;
    amount: string;
    recipient: string;
  }) {
    return this.request("/executions", {
      method: "POST",
      body: JSON.stringify(execution),
    });
  }
}
