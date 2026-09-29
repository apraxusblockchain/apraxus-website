import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const developerAccounts = sqliteTable("developer_accounts", {
  developerId: text("developer_id").primaryKey(),
  name: text("name").notNull(),
  createdAt: text("created_at").notNull(),
});

export const apiKeys = sqliteTable("api_keys", {
  keyId: text("key_id").primaryKey(),
  developerId: text("developer_id")
    .notNull()
    .references(() => developerAccounts.developerId),
  keyPrefix: text("key_prefix").notNull(),
  keyHash: text("key_hash").notNull(),
  createdAt: text("created_at").notNull(),
  revokedAt: text("revoked_at"),
});


export const agents = sqliteTable("agents", {
  agentId: text("agent_id").primaryKey(),
  developerId: text("developer_id")
    .notNull()
    .references(() => developerAccounts.developerId),
  billingCustomerId: text("billing_customer_id")
    .references(() => billingCustomers.customerId),
  name: text("name").notNull(),
  description: text("description"),
  status: text("status").notNull(),
  createdAt: text("created_at").notNull(),
});

export const agentWallets = sqliteTable(
  "agent_wallets",
  {
    agentId: text("agent_id")
      .primaryKey()
      .references(() => agents.agentId),
    walletAddress: text("wallet_address").notNull(),
    chainId: integer("chain_id").notNull(),
    boundAt: text("bound_at").notNull(),
  },
  (table) => ({
    chainWalletUnique: uniqueIndex("agent_wallets_chain_wallet_unique").on(
      table.chainId,
      table.walletAddress,
    ),
  }),
);

export const agentPolicies = sqliteTable("agent_policies", {
  agentId: text("agent_id")
    .primaryKey()
    .references(() => agents.agentId),
  dailyLimit: integer("daily_limit").notNull(),
  perTxLimit: integer("per_tx_limit").notNull(),
  updatedAt: text("updated_at").notNull(),
});


export const agentPolicyAccounting = sqliteTable("agent_policy_accounting", {
  agentId: text("agent_id")
    .primaryKey()
    .references(() => agents.agentId),
  spent: integer("spent").notNull(),
  windowStartedAt: text("window_started_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const billingCustomers = sqliteTable("billing_customers", {
  customerId: text("customer_id").primaryKey(),
  developerId: text("developer_id")
    .references(() => developerAccounts.developerId),
  name: text("name"),
  createdAt: text("created_at").notNull(),
}, (table) => ({
  developerUnique: uniqueIndex("billing_customers_developer_unique").on(table.developerId),
}));

export const billingSubscriptions = sqliteTable(
  "billing_subscriptions",
  {
    subscriptionId: text("subscription_id").primaryKey(),
    customerId: text("customer_id")
      .notNull()
      .references(() => billingCustomers.customerId),
    planId: text("plan_id").notNull(),
    status: text("status").notNull(),
    startedAt: text("started_at").notNull(),
    currentPeriodEndsAt: text("current_period_ends_at"),
  },
  (table) => ({
    activeCustomerUnique: uniqueIndex(
      "billing_subscriptions_active_customer_unique"
    )
      .on(table.customerId)
      .where(sql`status IN ('active', 'trialing')`),
  })
);


export const billingRecords = sqliteTable(
  "billing_records",
  {
    billingId: text("billing_id").primaryKey(),
    customerId: text("customer_id").notNull(),
    source: text("source").notNull(),
    status: text("status").notNull(),
    amount: integer("amount").notNull(),
    currency: text("currency").notNull(),
    referenceId: text("reference_id"),
    createdAt: text("created_at").notNull(),
  },
  (table) => ({
    referenceIdUnique: uniqueIndex("billing_records_reference_id_unique").on(
      table.referenceId
    ),
  })
);
