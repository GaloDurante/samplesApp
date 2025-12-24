PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_samples` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`client_id` integer,
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
	FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_samples`("id", "client_id", "sample_number", "entry_date", "sample_code", "colloquial_specie", "cultivar", "harvest_year", "mark", "lot_number", "lot_weight", "test_end_date", "observations", "sampling_date", "other_references", "seal_number", "specie", "other_deter") SELECT "id", "client_id", "sample_number", "entry_date", "sample_code", "colloquial_specie", "cultivar", "harvest_year", "mark", "lot_number", "lot_weight", "test_end_date", "observations", "sampling_date", "other_references", "seal_number", "specie", "other_deter" FROM `samples`;--> statement-breakpoint
DROP TABLE `samples`;--> statement-breakpoint
ALTER TABLE `__new_samples` RENAME TO `samples`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `samples_sample_number_unique` ON `samples` (`sample_number`);