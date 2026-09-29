import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import fs from "fs";

const dbPath = "./data/apraxus.db";
fs.mkdirSync("./data", { recursive: true });

const sqlite = new Database(dbPath);

export const db = drizzle(sqlite);
