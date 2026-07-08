import { defineConfig } from 'drizzle-kit';
import { config } from 'dotenv';

// If we pass DB_ENV=test in the terminal, load .env.test. Otherwise, load .env
const envPath = process.env.DB_ENV === 'test' ? '.env.test' : '.env';

// override: true ensures this path takes priority over Drizzle's auto-loader
config({ path: envPath, override: true });

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
