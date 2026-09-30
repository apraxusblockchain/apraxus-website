ALTER TABLE `executions` ADD `idempotency_key` text;--> statement-breakpoint
CREATE UNIQUE INDEX `executions_agent_id_idempotency_unique` ON `executions` (`agent_id`,`idempotency_key`);