CREATE TABLE `agent_policies` (
	`agent_id` text PRIMARY KEY NOT NULL,
	`daily_limit` integer NOT NULL,
	`per_tx_limit` integer NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`agent_id`) ON UPDATE no action ON DELETE no action
);
