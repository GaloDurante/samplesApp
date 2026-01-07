PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_sample_humidity` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sample_id` integer NOT NULL,
	`humidity` integer,
	`performed_at` text NOT NULL,
	FOREIGN KEY (`sample_id`) REFERENCES `samples`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_sample_humidity`("id", "sample_id", "humidity", "performed_at") SELECT "id", "sample_id", "humidity", "performed_at" FROM `sample_humidity`;--> statement-breakpoint
DROP TABLE `sample_humidity`;--> statement-breakpoint
ALTER TABLE `__new_sample_humidity` RENAME TO `sample_humidity`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `sample_humidity_sample_id_unique` ON `sample_humidity` (`sample_id`);--> statement-breakpoint
CREATE INDEX `idx_sample_humidity_sample_id` ON `sample_humidity` (`sample_id`);--> statement-breakpoint
CREATE INDEX `idx_sample_humidity_sample_date` ON `sample_humidity` (`sample_id`,`performed_at`);