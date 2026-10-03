PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_executions` (
	`request_id` text PRIMARY KEY NOT NULL,
	`agent_id` text NOT NULL,
	`idempotency_key` text,
	`wallet_address` text NOT NULL,
	`chain_id` integer NOT NULL,
	`asset_id` text NOT NULL,
	`asset_kind` text NOT NULL,
	`token_address` text,
	`amount` text NOT NULL,
	`recipient` text NOT NULL,
	`transaction_hash` text,
	`block_number` text,
	`status` text NOT NULL,
	`created_at` text NOT NULL,
	`confirmed_at` text,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`agent_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_executions`("request_id", "agent_id", "idempotency_key", "wallet_address", "chain_id", "asset_id", "asset_kind", "token_address", "amount", "recipient", "transaction_hash", "block_number", "status", "created_at", "confirmed_at") SELECT "request_id", "agent_id", "idempotency_key", "wallet_address", "chain_id", 'apxs:' || "chain_id", 'token', "token_address", "amount", "recipient", "transaction_hash", "block_number", "status", "created_at", "confirmed_at" FROM `executions`;--> statement-breakpoint
DROP TABLE `executions`;--> statement-breakpoint
ALTER TABLE `__new_executions` RENAME TO `executions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `executions_agent_id_idempotency_unique` ON `executions` (`agent_id`,`idempotency_key`);