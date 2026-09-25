export type ApraxusClientOptions = {
  baseUrl?: string;
  apiKey?: string;
};

export type HealthResponse = {
  service: string;
  version: string;
  status: string;
  network: string;
};

export type PaymentResponse = {
  requestId: string;
  success: boolean;
  type: "payment_intent";
  status: "pending";
  network: string;
  token: string;
  amount: string;
  recipient: string;
  agentId: string;
  execution: {
    mode: "intent_only";
    transactionSubmitted: false;
    transactionHash: null;
  };
};

export type QuoteResponse = {
  requestId: string;
  success: boolean;
  type: "quote";
  status: "available";
  network: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  execution: {
    mode: "quote_only";
    transactionSubmitted: false;
    transactionHash: null;
  };
};

export type ExecutionResponse = {
  requestId: string;
  success: boolean;
  type: "execution_intent";
  status: "pending";
  network: string;
  agentId: string;
  wallet: string;
  token: string;
  amount: string;
  recipient: string;
  execution: {
    mode: "intent_only";
    transactionSubmitted: false;
    transactionHash: null;
  };
};

export type SandboxResponse = {
  success: true;
  sandbox: true;
  requestId: string;
  action: "payment" | "quote" | "execution";
  status: "simulated";
  network: string;
  agentId: string;
  token: string;
  amount: string;
  execution: {
    mode: "simulation_only";
    transactionSubmitted: false;
    transactionHash: null;
  };
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

  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>("/health");
  }

  async createPayment(payment: {
    token: string;
    amount: string;
    recipient: string;
    agentId: string;
  }): Promise<PaymentResponse> {
    return this.request<PaymentResponse>("/payments", {
      method: "POST",
      body: JSON.stringify(payment),
    });
  }

  async getQuote(quote: {
    tokenIn: string;
    tokenOut: string;
    amountIn: string;
  }): Promise<QuoteResponse> {
    return this.request<QuoteResponse>("/quotes", {
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
  }): Promise<ExecutionResponse> {
    return this.request<ExecutionResponse>("/executions", {
      method: "POST",
      body: JSON.stringify(execution),
    });
  }

  async sandbox(request: {
    action?: "payment" | "quote" | "execution";
    agentId?: string;
    token?: string;
    amount?: string;
  }): Promise<SandboxResponse> {
    return this.request<SandboxResponse>("/sandbox", {
      method: "POST",
      body: JSON.stringify(request),
    });
  }
}
