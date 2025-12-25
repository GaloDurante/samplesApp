CREATE UNIQUE INDEX `sample_analysis_sample_id_unique` ON `sample_analysis` (`sample_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `sample_germination_sample_id_unique` ON `sample_germination` (`sample_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `sample_humidity_sample_id_unique` ON `sample_humidity` (`sample_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `sample_purity_sample_id_unique` ON `sample_purity` (`sample_id`);