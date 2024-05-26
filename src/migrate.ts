import * as path from "path";
import { promises as fs } from "fs";
import pg from "pg";
import {
  Kysely,
  Migrator,
  FileMigrationProvider,
  PostgresDialect,
} from "kysely";
import { DB } from "./types";
import * as dotenv from "dotenv";
dotenv.config();

const pool = new pg.Pool({
  database: process.env.DATABASE_NAME,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: Number(process.env.DATABASE_PORT),
  max: 10,
  password: process.env.DATABASE_PASSWORD,
});

const dialect = new PostgresDialect({
  pool: pool,
});

async function migrateToLatest() {
  const db = new Kysely<DB>({
    dialect,
  });

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      // This needs to be an absolute path.
      migrationFolder: path.join(__dirname, "../migrations"),
    }),
  });

  const { error, results } = await migrator.migrateToLatest();

  results?.forEach((it) => {
    if (it.status === "Success") {
      console.log(`migration "${it.migrationName}" was executed successfully`);
    } else if (it.status === "Error") {
      console.error(`failed to execute migration "${it.migrationName}"`);
    }
  });

  if (error) {
    console.error("failed to migrate");
    console.error(error);
    process.exit(1);
  }

  await db.destroy();
}

migrateToLatest();
