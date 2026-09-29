CREATE TABLE `agents` (
	`agent_id` text PRIMARY KEY NOT NULL,
	`developer_id` text NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`status` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`developer_id`) REFERENCES `developer_accounts`(`developer_id`) ON UPDATE no action ON DELETE no action
);
