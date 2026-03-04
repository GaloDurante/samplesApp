PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sample_purity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sample_id` integer NOT NULL,
	`seed_pure` real,
	`inert_matter` real,
	`other_seeds` real,
	`type_inert_matter` text,
	`remarks` text,
	`performed_at` text NOT NULL,
	FOREIGN KEY (`sample_id`) REFERENCES `samples`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_sample_purity`("id", "sample_id", "seed_pure", "inert_matter", "other_seeds", "type_inert_matter", "remarks", "performed_at") SELECT "id", "sample_id", "seed_pure", "inert_matter", "other_seeds", "type_inert_matter", "remarks", "performed_at" FROM `sample_purity`;--> statement-breakpoint
DROP TABLE `sample_purity`;--> statement-breakpoint
ALTER TABLE `__new_sample_purity` RENAME TO `sample_purity`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `sample_purity_sample_id_unique` ON `sample_purity` (`sample_id`);--> statement-breakpoint
CREATE INDEX `idx_sample_purity_sample_id` ON `sample_purity` (`sample_id`);--> statement-breakpoint
CREATE INDEX `idx_sample_purity_sample_date` ON `sample_purity` (`sample_id`,`performed_at`);