import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
export const atlasProgress = sqliteTable('atlas_progress', { userId:text('user_id').primaryKey(), payload:text('payload').notNull(), revision:integer('revision').notNull().default(0), updatedAt:text('updated_at').notNull().default('') });
