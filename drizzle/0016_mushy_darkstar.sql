CREATE TABLE `platform_fee_records` (
	`fee_id` text PRIMARY KEY NOT NULL,
	`execution_id` text NOT NULL,
	`agent_id` text NOT NULL,
	`chain_id` integer NOT NULL,
	`asset_id` text NOT NULL,
	`asset_kind` text NOT NULL,
	`token_address` text,
	`fee_amount` text NOT NULL,
	`basis_points` integer NOT NULL,
	`status` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`execution_id`) REFERENCES `executions`(`request_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`agent_id`) REFERENCES `agents`(`agent_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `platform_fee_records_execution_unique` ON `platform_fee_records` (`execution_id`);