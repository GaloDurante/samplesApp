PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_clients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`cuit` integer,
	`address` text NOT NULL,
	`email` text,
	`phone` text
);
--> statement-breakpoint
INSERT INTO `__new_clients`("id", "name", "cuit", "address", "email", "phone") SELECT "id", "name", "cuit", "address", "email", "phone" FROM `clients`;--> statement-breakpoint
DROP TABLE `clients`;--> statement-breakpoint
ALTER TABLE `__new_clients` RENAME TO `clients`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `clients_cuit_unique` ON `clients` (`cuit`);--> statement-breakpoint
CREATE UNIQUE INDEX `clients_email_unique` ON `clients` (`email`);