CREATE TABLE `agent_wallets` (
	`agent_id` text PRIMARY KEY NOT NULL,
	`wallet_address` text NOT NULL,
	`chain_id` integer NOT NULL,
	`bound_at` text NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`agent_id`) ON UPDATE no action ON DELETE no action
);
