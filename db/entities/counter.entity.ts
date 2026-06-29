import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";
import { OwnedEntity } from "./base.entity";

/**
 * Per-tenant sequence counters used to mint human-readable display numbers
 * (e.g. "Order #1") without exposing the underlying UUID primary keys.
 * One row per (userId, entityType); `lastValue` is advanced atomically via
 * an upsert in shared/sequence.ts — never read-then-write.
 */
@Entity("entity_counters")
@Index(["userId", "entityType"], { unique: true })
export class EntityCounterEntity extends OwnedEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column("varchar")
  entityType!: string;

  @Column({ type: "integer", default: 0 })
  lastValue!: number;
}
