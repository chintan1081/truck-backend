var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OwnedEntity } from "./base.entity";
let SettingsEntity = class SettingsEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], SettingsEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "boolean", default: true })
], SettingsEntity.prototype, "dieselApprovalRequired", void 0);
__decorate([
    Column({ type: "boolean", default: true })
], SettingsEntity.prototype, "limitStrictEnforcement", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SettingsEntity.prototype, "companyName", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SettingsEntity.prototype, "companyEmail", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SettingsEntity.prototype, "companyContact", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SettingsEntity.prototype, "companyWhatsapp", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SettingsEntity.prototype, "companyAddress", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], SettingsEntity.prototype, "companyServices", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SettingsEntity.prototype, "companyGst", void 0);
__decorate([
    Column({ type: "text", nullable: true })
], SettingsEntity.prototype, "companyLogo", void 0);
__decorate([
    Column({ type: "text", nullable: true })
], SettingsEntity.prototype, "companySignature", void 0);
__decorate([
    Column({ type: "simple-json", nullable: true })
], SettingsEntity.prototype, "bankDetails", void 0);
SettingsEntity = __decorate([
    Entity("app_settings")
], SettingsEntity);
export { SettingsEntity };
let CustomAlertEntity = class CustomAlertEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], CustomAlertEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], CustomAlertEntity.prototype, "title", void 0);
__decorate([
    Column("varchar")
], CustomAlertEntity.prototype, "description", void 0);
__decorate([
    Column("varchar")
], CustomAlertEntity.prototype, "category", void 0);
__decorate([
    Column("varchar")
], CustomAlertEntity.prototype, "urgency", void 0);
__decorate([
    Column("varchar")
], CustomAlertEntity.prototype, "date", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], CustomAlertEntity.prototype, "truckId", void 0);
__decorate([
    Column({ type: "boolean", default: false })
], CustomAlertEntity.prototype, "isResolved", void 0);
CustomAlertEntity = __decorate([
    Entity("custom_alerts")
], CustomAlertEntity);
export { CustomAlertEntity };
