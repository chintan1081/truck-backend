import { DataSource } from "typeorm";

/**
 * Atomically advances a per-tenant, per-entity-type counter and returns the
 * new value. Used to mint human-readable display numbers (e.g. "Order #4")
 * without exposing UUID primary keys. A single upsert — no read-then-write,
 * so it stays correct under concurrent creates.
 */
export async function nextSequenceValue(db: DataSource, userId: string, entityType: string): Promise<number> {
  const rows: { lastValue: number }[] = await db.query(
    `INSERT INTO entity_counters ("id", "userId", "entityType", "lastValue")
     VALUES (gen_random_uuid(), $1, $2, 1)
     ON CONFLICT ("userId", "entityType") DO UPDATE SET "lastValue" = entity_counters."lastValue" + 1
     RETURNING "lastValue"`,
    [userId, entityType]
  );
  return rows[0].lastValue;
}
