CREATE TABLE `billing_records` (
	`billing_id` text PRIMARY KEY NOT NULL,
	`customer_id` text NOT NULL,
	`source` text NOT NULL,
	`status` text NOT NULL,
	`amount` integer NOT NULL,
	`currency` text NOT NULL,
	`reference_id` text,
	`created_at` text NOT NULL
);
