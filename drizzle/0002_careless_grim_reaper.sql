CREATE TABLE `api_keys` (
	`key_id` text PRIMARY KEY NOT NULL,
	`developer_id` text NOT NULL,
	`key_prefix` text NOT NULL,
	`key_hash` text NOT NULL,
	`created_at` text NOT NULL,
	`revoked_at` text,
	FOREIGN KEY (`developer_id`) REFERENCES `developer_accounts`(`developer_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `developer_accounts` (
	`developer_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`created_at` text NOT NULL
);
