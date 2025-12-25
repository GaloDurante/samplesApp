CREATE TABLE `sample_analysis` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sample_id` integer NOT NULL,
	`first_count` integer,
	`pg` integer,
	`pg_curado` integer,
	`ct` integer,
	`ct_curado` integer,
	`ea` integer,
	`ea_curado` integer,
	`vigor_tz` integer,
	`viability_tz` integer,
	`e` integer,
	`pms` integer,
	`purity_percent` integer,
	`other_analysis` text,
	`performed_at` text NOT NULL,
	FOREIGN KEY (`sample_id`) REFERENCES `samples`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_sample_analysis_sample_id` ON `sample_analysis` (`sample_id`);--> statement-breakpoint
CREATE INDEX `idx_sample_analysis_sample_date` ON `sample_analysis` (`sample_id`,`performed_at`);--> statement-breakpoint
CREATE TABLE `sample_germination` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sample_id` integer NOT NULL,
	`days_number` text,
	`normal_seedlings` text,
	`hard_seeds` text,
	`fresh_seeds` text,
	`abnormal_seedlings` text,
	`dead_seeds` text,
	`performed_at` text NOT NULL,
	FOREIGN KEY (`sample_id`) REFERENCES `samples`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_sample_germination_sample_id` ON `sample_germination` (`sample_id`);--> statement-breakpoint
CREATE INDEX `idx_sample_germination_sample_date` ON `sample_germination` (`sample_id`,`performed_at`);--> statement-breakpoint
CREATE TABLE `sample_humidity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sample_id` integer NOT NULL,
	`humidity` text,
	`performed_at` text NOT NULL,
	FOREIGN KEY (`sample_id`) REFERENCES `samples`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_sample_humidity_sample_id` ON `sample_humidity` (`sample_id`);--> statement-breakpoint
CREATE INDEX `idx_sample_humidity_sample_date` ON `sample_humidity` (`sample_id`,`performed_at`);--> statement-breakpoint
CREATE TABLE `sample_purity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sample_id` integer NOT NULL,
	`seed_pure` text,
	`inert_matter` text,
	`other_seeds` text,
	`type_inert_matter` text,
	`remarks` text,
	`performed_at` text NOT NULL,
	FOREIGN KEY (`sample_id`) REFERENCES `samples`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `idx_sample_purity_sample_id` ON `sample_purity` (`sample_id`);--> statement-breakpoint
CREATE INDEX `idx_sample_purity_sample_date` ON `sample_purity` (`sample_id`,`performed_at`);--> statement-breakpoint
CREATE INDEX `idx_samples_client_id` ON `samples` (`client_id`);--> statement-breakpoint
CREATE INDEX `idx_samples_entry_date` ON `samples` (`entry_date`);