CREATE TABLE `billing_customers` (
	`customer_id` text PRIMARY KEY NOT NULL,
	`name` text,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `billing_subscriptions` (
	`subscription_id` text PRIMARY KEY NOT NULL,
	`customer_id` text NOT NULL,
	`plan_id` text NOT NULL,
	`status` text NOT NULL,
	`started_at` text NOT NULL,
	`current_period_ends_at` text,
	FOREIGN KEY (`customer_id`) REFERENCES `billing_customers`(`customer_id`) ON UPDATE no action ON DELETE no action
);
