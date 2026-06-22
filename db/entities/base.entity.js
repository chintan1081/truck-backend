var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Column, Index, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./user.entity";
/**
 * Base class for every user-owned record.
 *
 * Instead of isolating tenants in separate Postgres schemas, all data lives in a
 * single schema and every row carries a `userId` foreign key back to the users
 * table. Repositories must always filter by `userId` so a user only ever sees
 * (and can only mutate) their own rows.
 *
 * `userId` is the source of truth used in queries; the `user` relation exists to
 * enforce the foreign key (with cascade delete) at the database level.
 */
export class OwnedEntity {
}
__decorate([
    Index(),
    Column("varchar")
], OwnedEntity.prototype, "userId", void 0);
__decorate([
    ManyToOne(() => UserEntity, { onDelete: "CASCADE", nullable: true }),
    JoinColumn({ name: "userId" })
], OwnedEntity.prototype, "user", void 0);
