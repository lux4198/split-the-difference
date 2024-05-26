import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Migration code
  db.schema
    .alterTable("Group")
    .alterColumn("updatedAt", (col) => col.dropNotNull())
    .execute();

  console.log("Group - updatedAt - dropNotNull");
}

export async function down(db: Kysely<any>): Promise<void> {
  // Migration code
  db.schema
    .alterTable("Group")
    .alterColumn("updatedAt", (col) => col.setNotNull())
    .execute();

  console.log("Group - updatedAt - setNotNull");
}
