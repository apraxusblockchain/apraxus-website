import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { developerAccounts } from "@/lib/db/schema";

export type DeveloperAccount = {
  developerId: string;
  name: string;
  createdAt: string;
};

function toDeveloperAccount(
  row: typeof developerAccounts.$inferSelect,
): DeveloperAccount {
  return {
    developerId: row.developerId,
    name: row.name,
    createdAt: row.createdAt,
  };
}

export function createDeveloperAccount(name: string): DeveloperAccount {
  const account = {
    developerId: `dev_${randomUUID()}`,
    name,
    createdAt: new Date().toISOString(),
  };

  db.insert(developerAccounts).values(account).run();

  return account;
}

export function getDeveloperAccount(
  developerId: string,
): DeveloperAccount | null {
  const row = db
    .select()
    .from(developerAccounts)
    .where(eq(developerAccounts.developerId, developerId))
    .get();

  return row ? toDeveloperAccount(row) : null;
}
