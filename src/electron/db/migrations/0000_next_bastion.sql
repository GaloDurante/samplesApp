CREATE TABLE `clients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`cuit` integer NOT NULL,
	`address` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `clients_cuit_unique` ON `clients` (`cuit`);--> statement-breakpoint
CREATE UNIQUE INDEX `clients_email_unique` ON `clients` (`email`);--> statement-breakpoint
CREATE TABLE `samples` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`client_id` integer NOT NULL,
	`sample_number` text NOT NULL,
	`entry_date` text NOT NULL,
	`sample_code` text,
	`colloquial_specie` text NOT NULL,
	`cultivar` text NOT NULL,
	`harvest_year` text NOT NULL,
	`mark` text,
	`lot_number` text,
	`lot_weight` text,
	`test_end_date` text NOT NULL,
	`observations` text,
	`sampling_date` text,
	`other_references` text,
	`seal_number` text,
	`specie` text,
	`other_deter` text,
	FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON UPDATE no action ON DELETE restrict
);
--> statement-breakpoint
CREATE UNIQUE INDEX `samples_sample_number_unique` ON `samples` (`sample_number`);