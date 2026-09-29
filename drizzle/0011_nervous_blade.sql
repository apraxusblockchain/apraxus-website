CREATE TABLE `agent_policy_accounting` (
	`agent_id` text PRIMARY KEY NOT NULL,
	`spent` integer NOT NULL,
	`window_started_at` text NOT NULL,
	`updated_at` text NOT NULL,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`agent_id`) ON UPDATE no action ON DELETE no action
);
