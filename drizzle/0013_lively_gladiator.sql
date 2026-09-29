CREATE TABLE `executions` (
	`request_id` text PRIMARY KEY NOT NULL,
	`agent_id` text NOT NULL,
	`wallet_address` text NOT NULL,
	`chain_id` integer NOT NULL,
	`token_address` text NOT NULL,
	`amount` text NOT NULL,
	`recipient` text NOT NULL,
	`transaction_hash` text,
	`block_number` text,
	`status` text NOT NULL,
	`created_at` text NOT NULL,
	`confirmed_at` text,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`agent_id`) ON UPDATE no action ON DELETE no action
);
