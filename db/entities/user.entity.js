var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
/**
 * The single account table. Every other entity references a user via its
 * `userId` foreign key (see OwnedEntity). Kept in its own file so the base
 * entity can import it without creating an import cycle.
 */
let UserEntity = class UserEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], UserEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", unique: true })
], UserEntity.prototype, "email", void 0);
__decorate([
    Column("varchar")
], UserEntity.prototype, "passwordHash", void 0);
__decorate([
    Column("varchar")
], UserEntity.prototype, "passwordSalt", void 0);
__decorate([
    Column({ type: "varchar", default: "ADMIN" })
], UserEntity.prototype, "role", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], UserEntity.prototype, "name", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], UserEntity.prototype, "createdAt", void 0);
__decorate([
    Column({ type: "text", nullable: true })
], UserEntity.prototype, "profilePhoto", void 0);
UserEntity = __decorate([
    Entity("users")
], UserEntity);
export { UserEntity };
