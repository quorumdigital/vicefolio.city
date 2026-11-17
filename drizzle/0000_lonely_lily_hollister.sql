CREATE TABLE `atlas_progress` (
	`user_id` text PRIMARY KEY NOT NULL,
	`payload` text NOT NULL,
	`revision` integer DEFAULT 0 NOT NULL,
	`updated_at` text DEFAULT '' NOT NULL
);
