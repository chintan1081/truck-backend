import { DataSource } from "typeorm";
import { logger } from "../config/logger";

/**
 * One-time-per-row backfill for the human-readable `orderNumber`/`entryNumber`
 * columns introduced after Orders and Plant Pool entries already had data.
 * Idempotent and cheap to run on every boot: the UPDATE only touches rows
 * that are still NULL, and the counter seed never lowers an existing value.
 */
export async function backfillDisplayNumbers(db: DataSource): Promise<void> {
  const orderResult = await db.query(`
    WITH ranked AS (
      SELECT id, "userId", ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "pickupDate" ASC, id ASC) AS rn
      FROM orders WHERE "orderNumber" IS NULL
    )
    UPDATE orders o SET "orderNumber" = ranked.rn
    FROM ranked WHERE ranked.id = o.id
  `);

  const poolResult = await db.query(`
    WITH ranked AS (
      SELECT id, "userId", ROW_NUMBER() OVER (PARTITION BY "userId" ORDER BY "date" ASC, id ASC) AS rn
      FROM plant_advance_pool_entries WHERE "entryNumber" IS NULL
    )
    UPDATE plant_advance_pool_entries p SET "entryNumber" = ranked.rn
    FROM ranked WHERE ranked.id = p.id
  `);

  await db.query(`
    INSERT INTO entity_counters ("id", "userId", "entityType", "lastValue")
    SELECT gen_random_uuid(), "userId", 'order', MAX("orderNumber") FROM orders
    WHERE "orderNumber" IS NOT NULL GROUP BY "userId"
    ON CONFLICT ("userId", "entityType")
    DO UPDATE SET "lastValue" = GREATEST(entity_counters."lastValue", EXCLUDED."lastValue")
  `);

  await db.query(`
    INSERT INTO entity_counters ("id", "userId", "entityType", "lastValue")
    SELECT gen_random_uuid(), "userId", 'pool', MAX("entryNumber") FROM plant_advance_pool_entries
    WHERE "entryNumber" IS NOT NULL GROUP BY "userId"
    ON CONFLICT ("userId", "entityType")
    DO UPDATE SET "lastValue" = GREATEST(entity_counters."lastValue", EXCLUDED."lastValue")
  `);

  const orderRows = (orderResult as any).rowCount ?? orderResult?.[1] ?? 0;
  const poolRows = (poolResult as any).rowCount ?? poolResult?.[1] ?? 0;
  if (orderRows || poolRows) {
    logger.info("Backfilled display numbers", { orders: orderRows, poolEntries: poolRows });
  }
}
