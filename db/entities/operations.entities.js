var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OwnedEntity } from "./base.entity";
let ClientEntity = class ClientEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], ClientEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ClientEntity.prototype, "trackingId", void 0);
__decorate([
    Column("varchar")
], ClientEntity.prototype, "name", void 0);
__decorate([
    Column("varchar")
], ClientEntity.prototype, "gstNumber", void 0);
__decorate([
    Column("varchar")
], ClientEntity.prototype, "address", void 0);
__decorate([
    Column("varchar")
], ClientEntity.prototype, "city", void 0);
__decorate([
    Column("varchar")
], ClientEntity.prototype, "state", void 0);
__decorate([
    Column("varchar")
], ClientEntity.prototype, "country", void 0);
__decorate([
    Column("varchar")
], ClientEntity.prototype, "pincode", void 0);
__decorate([
    Column("varchar")
], ClientEntity.prototype, "contactPerson", void 0);
__decorate([
    Column("varchar")
], ClientEntity.prototype, "email", void 0);
__decorate([
    Column("varchar")
], ClientEntity.prototype, "phone", void 0);
__decorate([
    Column("numeric", { default: 0 })
], ClientEntity.prototype, "outstandingBalance", void 0);
ClientEntity = __decorate([
    Entity("clients")
], ClientEntity);
export { ClientEntity };
let SiteEntity = class SiteEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], SiteEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SiteEntity.prototype, "trackingId", void 0);
__decorate([
    Column("varchar")
], SiteEntity.prototype, "name", void 0);
__decorate([
    Column("varchar")
], SiteEntity.prototype, "location", void 0);
__decorate([
    Column("varchar")
], SiteEntity.prototype, "city", void 0);
__decorate([
    Column("varchar")
], SiteEntity.prototype, "state", void 0);
__decorate([
    Column("varchar")
], SiteEntity.prototype, "country", void 0);
__decorate([
    Column("varchar")
], SiteEntity.prototype, "pincode", void 0);
__decorate([
    Column("varchar")
], SiteEntity.prototype, "type", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SiteEntity.prototype, "contactPerson", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SiteEntity.prototype, "contactPhone", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SiteEntity.prototype, "email", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], SiteEntity.prototype, "gstNumber", void 0);
__decorate([
    Column("numeric", { default: 0 })
], SiteEntity.prototype, "outstandingBalance", void 0);
SiteEntity = __decorate([
    Entity("sites")
], SiteEntity);
export { SiteEntity };
let RouteEntity = class RouteEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], RouteEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], RouteEntity.prototype, "trackingId", void 0);
__decorate([
    Column("varchar")
], RouteEntity.prototype, "source", void 0);
__decorate([
    Column("varchar")
], RouteEntity.prototype, "destination", void 0);
__decorate([
    Column("numeric")
], RouteEntity.prototype, "distanceKm", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], RouteEntity.prototype, "mapUrl", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], RouteEntity.prototype, "sourceMapUrl", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], RouteEntity.prototype, "destinationMapUrl", void 0);
RouteEntity = __decorate([
    Entity("routes")
], RouteEntity);
export { RouteEntity };
let BrokerEntity = class BrokerEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], BrokerEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], BrokerEntity.prototype, "trackingId", void 0);
__decorate([
    Column("varchar")
], BrokerEntity.prototype, "name", void 0);
__decorate([
    Column("varchar")
], BrokerEntity.prototype, "email", void 0);
__decorate([
    Column("varchar")
], BrokerEntity.prototype, "phone", void 0);
__decorate([
    Column("varchar")
], BrokerEntity.prototype, "whatsappNumber", void 0);
__decorate([
    Column("varchar")
], BrokerEntity.prototype, "address", void 0);
__decorate([
    Column("varchar")
], BrokerEntity.prototype, "upiId", void 0);
__decorate([
    Column("simple-json")
], BrokerEntity.prototype, "bankDetails", void 0);
BrokerEntity = __decorate([
    Entity("brokers")
], BrokerEntity);
export { BrokerEntity };
let ItemProductEntity = class ItemProductEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], ItemProductEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ItemProductEntity.prototype, "trackingId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ItemProductEntity.prototype, "productName", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ItemProductEntity.prototype, "productColour", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ItemProductEntity.prototype, "hsnSacCode", void 0);
__decorate([
    Column("numeric", { default: 0 })
], ItemProductEntity.prototype, "gstRate", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], ItemProductEntity.prototype, "services", void 0);
ItemProductEntity = __decorate([
    Entity("item_products")
], ItemProductEntity);
export { ItemProductEntity };
let OrderEntity = class OrderEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], OrderEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], OrderEntity.prototype, "clientName", void 0);
__decorate([
    Column("varchar")
], OrderEntity.prototype, "projectSite", void 0);
__decorate([
    Column("numeric")
], OrderEntity.prototype, "quantity", void 0);
__decorate([
    Column("numeric")
], OrderEntity.prototype, "ratePerMT", void 0);
__decorate([
    Column("varchar")
], OrderEntity.prototype, "pickupDate", void 0);
__decorate([
    Column("varchar")
], OrderEntity.prototype, "deliveryDate", void 0);
__decorate([
    Column({ type: "boolean", default: true })
], OrderEntity.prototype, "hasGST", void 0);
__decorate([
    Column("varchar")
], OrderEntity.prototype, "paymentTerms", void 0);
__decorate([
    Column("varchar")
], OrderEntity.prototype, "status", void 0);
__decorate([
    Column("numeric", { nullable: true })
], OrderEntity.prototype, "totalKm", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "assignedTruckId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "assignedRouteId", void 0);
__decorate([
    Column("numeric", { nullable: true })
], OrderEntity.prototype, "estimatedDiesel", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "materialName", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "hsnSacCode", void 0);
__decorate([
    Column("numeric", { nullable: true })
], OrderEntity.prototype, "gstRate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "itemCode", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], OrderEntity.prototype, "services", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "dcNo", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "soNo", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "remarks", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "brokerId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "brokerName", void 0);
__decorate([
    Column("numeric", { nullable: true })
], OrderEntity.prototype, "brokerCommissionPerMT", void 0);
__decorate([
    Column("numeric", { nullable: true })
], OrderEntity.prototype, "totalBrokerCommission", void 0);
__decorate([
    Column("numeric", { nullable: true })
], OrderEntity.prototype, "actualQuantity", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "podImageUrl", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "loadingSlipUrl", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "hazardNote", void 0);
__decorate([
    Column("numeric", { nullable: true })
], OrderEntity.prototype, "dieselRatePerLiter", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "assignedTruckNumber", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "driverName", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], OrderEntity.prototype, "driverPhone", void 0);
OrderEntity = __decorate([
    Entity("orders")
], OrderEntity);
export { OrderEntity };
let ExpenseEntity = class ExpenseEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], ExpenseEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], ExpenseEntity.prototype, "category", void 0);
__decorate([
    Column("varchar")
], ExpenseEntity.prototype, "date", void 0);
__decorate([
    Column("numeric")
], ExpenseEntity.prototype, "amount", void 0);
__decorate([
    Column("varchar")
], ExpenseEntity.prototype, "paymentMode", void 0);
__decorate([
    Column("varchar")
], ExpenseEntity.prototype, "referenceNo", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ExpenseEntity.prototype, "orderId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ExpenseEntity.prototype, "truckId", void 0);
__decorate([
    Column("varchar")
], ExpenseEntity.prototype, "vendorName", void 0);
__decorate([
    Column("varchar")
], ExpenseEntity.prototype, "description", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ExpenseEntity.prototype, "receiptUrl", void 0);
__decorate([
    Column("varchar")
], ExpenseEntity.prototype, "status", void 0);
__decorate([
    Column({ type: "boolean", default: false })
], ExpenseEntity.prototype, "isAuto", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], ExpenseEntity.prototype, "history", void 0);
__decorate([
    Column("numeric", { nullable: true })
], ExpenseEntity.prototype, "liters", void 0);
__decorate([
    Column("numeric", { nullable: true })
], ExpenseEntity.prototype, "rate", void 0);
__decorate([
    Column({ type: "boolean", nullable: true })
], ExpenseEntity.prototype, "isLimitExceeded", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ExpenseEntity.prototype, "responsibleStaff", void 0);
__decorate([
    Column("varchar")
], ExpenseEntity.prototype, "paymentStatus", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ExpenseEntity.prototype, "dueDate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ExpenseEntity.prototype, "paidDate", void 0);
__decorate([
    Column({ type: "boolean", nullable: true })
], ExpenseEntity.prototype, "isMaintenance", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ExpenseEntity.prototype, "poolId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ExpenseEntity.prototype, "bankId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], ExpenseEntity.prototype, "bankName", void 0);
ExpenseEntity = __decorate([
    Entity("expenses")
], ExpenseEntity);
export { ExpenseEntity };
