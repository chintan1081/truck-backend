var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OwnedEntity } from "./base.entity";
let BankEntity = class BankEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], BankEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BankEntity.prototype, "trackingId", void 0);
__decorate([
    Column("varchar")
], BankEntity.prototype, "bankName", void 0);
__decorate([
    Column("varchar")
], BankEntity.prototype, "bankAddress", void 0);
__decorate([
    Column("varchar")
], BankEntity.prototype, "accountNumber", void 0);
__decorate([
    Column("varchar")
], BankEntity.prototype, "checkNumber", void 0);
__decorate([
    Column("varchar")
], BankEntity.prototype, "description", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BankEntity.prototype, "ifscCode", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BankEntity.prototype, "managerName", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BankEntity.prototype, "managerEmail", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BankEntity.prototype, "managerPhone", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BankEntity.prototype, "managerWhatsapp", void 0);
BankEntity = __decorate([
    Entity("banks")
], BankEntity);
export { BankEntity };
let InvoiceEntity = class InvoiceEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], InvoiceEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "invoiceNumber", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "clientId", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "clientName", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "clientGst", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "date", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "dueDate", void 0);
__decorate([
    Column("simple-json")
], InvoiceEntity.prototype, "orderIds", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], InvoiceEntity.prototype, "poNumber", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], InvoiceEntity.prototype, "soNumber", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], InvoiceEntity.prototype, "ewayBill", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "sacCode", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "placeOfSupply", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "bankAccount", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], InvoiceEntity.prototype, "selectedBankId", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "subTotal", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "gstRate", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "gstType", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "gstAmount", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "tdsAmount", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "discountAmount", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "tcsRate", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "tcsAmount", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "roundOff", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "autoRoundOff", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "totalAmount", void 0);
__decorate([
    Column("numeric")
], InvoiceEntity.prototype, "paidAmount", void 0);
__decorate([
    Column("varchar")
], InvoiceEntity.prototype, "status", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], InvoiceEntity.prototype, "previousStatus", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], InvoiceEntity.prototype, "payments", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], InvoiceEntity.prototype, "history", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], InvoiceEntity.prototype, "notes", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], InvoiceEntity.prototype, "terms", void 0);
__decorate([
    Column("numeric", { nullable: true })
], InvoiceEntity.prototype, "overdueCount", void 0);
InvoiceEntity = __decorate([
    Entity("invoices")
], InvoiceEntity);
export { InvoiceEntity };
let PlantAdvanceEntity = class PlantAdvanceEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], PlantAdvanceEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], PlantAdvanceEntity.prototype, "orderId", void 0);
__decorate([
    Column("varchar")
], PlantAdvanceEntity.prototype, "truckId", void 0);
__decorate([
    Column("varchar")
], PlantAdvanceEntity.prototype, "stationId", void 0);
__decorate([
    Column("numeric")
], PlantAdvanceEntity.prototype, "amount", void 0);
__decorate([
    Column("varchar")
], PlantAdvanceEntity.prototype, "date", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PlantAdvanceEntity.prototype, "utilizationDate", void 0);
__decorate([
    Column("varchar")
], PlantAdvanceEntity.prototype, "paymentMode", void 0);
__decorate([
    Column("varchar")
], PlantAdvanceEntity.prototype, "referenceNo", void 0);
__decorate([
    Column("varchar")
], PlantAdvanceEntity.prototype, "status", void 0);
__decorate([
    Column({ type: "boolean", default: false })
], PlantAdvanceEntity.prototype, "isPriority", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PlantAdvanceEntity.prototype, "notes", void 0);
__decorate([
    Column("numeric", { nullable: true })
], PlantAdvanceEntity.prototype, "quantity", void 0);
__decorate([
    Column("numeric", { nullable: true })
], PlantAdvanceEntity.prototype, "rate", void 0);
PlantAdvanceEntity = __decorate([
    Entity("plant_advances")
], PlantAdvanceEntity);
export { PlantAdvanceEntity };
let PlantAdvancePoolEntryEntity = class PlantAdvancePoolEntryEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], PlantAdvancePoolEntryEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], PlantAdvancePoolEntryEntity.prototype, "stationId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PlantAdvancePoolEntryEntity.prototype, "employeeId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PlantAdvancePoolEntryEntity.prototype, "employeeName", void 0);
__decorate([
    Column("numeric")
], PlantAdvancePoolEntryEntity.prototype, "amount", void 0);
__decorate([
    Column("varchar")
], PlantAdvancePoolEntryEntity.prototype, "date", void 0);
__decorate([
    Column("varchar")
], PlantAdvancePoolEntryEntity.prototype, "referenceNo", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PlantAdvancePoolEntryEntity.prototype, "notes", void 0);
__decorate([
    Column("varchar")
], PlantAdvancePoolEntryEntity.prototype, "transactionType", void 0);
__decorate([
    Column("varchar")
], PlantAdvancePoolEntryEntity.prototype, "paymentMethod", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PlantAdvancePoolEntryEntity.prototype, "bankId", void 0);
PlantAdvancePoolEntryEntity = __decorate([
    Entity("plant_advance_pool_entries")
], PlantAdvancePoolEntryEntity);
export { PlantAdvancePoolEntryEntity };
let StationRateEntity = class StationRateEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], StationRateEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], StationRateEntity.prototype, "stationId", void 0);
__decorate([
    Column("numeric", { default: 0 })
], StationRateEntity.prototype, "rate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], StationRateEntity.prototype, "dateAdded", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], StationRateEntity.prototype, "notes", void 0);
StationRateEntity = __decorate([
    Entity("station_rates")
], StationRateEntity);
export { StationRateEntity };
let BankTransactionEntity = class BankTransactionEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], BankTransactionEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], BankTransactionEntity.prototype, "bankId", void 0);
__decorate([
    Column("varchar")
], BankTransactionEntity.prototype, "bankName", void 0);
__decorate([
    Column("varchar")
], BankTransactionEntity.prototype, "type", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BankTransactionEntity.prototype, "fromWhere", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BankTransactionEntity.prototype, "toWhom", void 0);
__decorate([
    Column("numeric")
], BankTransactionEntity.prototype, "amount", void 0);
__decorate([
    Column("varchar")
], BankTransactionEntity.prototype, "date", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BankTransactionEntity.prototype, "checkNo", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BankTransactionEntity.prototype, "neftUpiId", void 0);
__decorate([
    Column("varchar")
], BankTransactionEntity.prototype, "description", void 0);
BankTransactionEntity = __decorate([
    Entity("bank_transactions")
], BankTransactionEntity);
export { BankTransactionEntity };
let PaymentRecordEntity = class PaymentRecordEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], PaymentRecordEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], PaymentRecordEntity.prototype, "type", void 0);
__decorate([
    Column("varchar")
], PaymentRecordEntity.prototype, "partyName", void 0);
__decorate([
    Column("varchar")
], PaymentRecordEntity.prototype, "method", void 0);
__decorate([
    Column("numeric")
], PaymentRecordEntity.prototype, "amount", void 0);
__decorate([
    Column("varchar")
], PaymentRecordEntity.prototype, "date", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PaymentRecordEntity.prototype, "bankId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PaymentRecordEntity.prototype, "bankName", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PaymentRecordEntity.prototype, "transactionId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PaymentRecordEntity.prototype, "chequeNo", void 0);
__decorate([
    Column("varchar")
], PaymentRecordEntity.prototype, "description", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PaymentRecordEntity.prototype, "poolId", void 0);
PaymentRecordEntity = __decorate([
    Entity("payment_records")
], PaymentRecordEntity);
export { PaymentRecordEntity };
