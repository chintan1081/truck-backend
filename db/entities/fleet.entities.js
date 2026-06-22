var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OwnedEntity } from "./base.entity";
let TruckEntity = class TruckEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], TruckEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "trackingId", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "name", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "description", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "modelNumber", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "plateNumber", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "truckNumber", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "driverName", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "ownerName", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "ownerContact", void 0);
__decorate([
    Column("numeric")
], TruckEntity.prototype, "mileage", void 0);
__decorate([
    Column("numeric")
], TruckEntity.prototype, "dieselLimit", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "status", void 0);
__decorate([
    Column({ type: "boolean", default: false })
], TruckEntity.prototype, "isMaintenanceMode", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "assignedDriverId", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "insuranceExpiry", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "fitnessExpiry", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "permitExpiry", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "pollutionExpiry", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "rcExpiry", void 0);
__decorate([
    Column("varchar")
], TruckEntity.prototype, "lastServiceDate", void 0);
__decorate([
    Column("numeric")
], TruckEntity.prototype, "totalMtHandled", void 0);
__decorate([
    Column("numeric")
], TruckEntity.prototype, "driverScore", void 0);
__decorate([
    Column("numeric")
], TruckEntity.prototype, "idleTimeHours", void 0);
__decorate([
    Column("numeric")
], TruckEntity.prototype, "engineHours", void 0);
__decorate([
    Column("numeric")
], TruckEntity.prototype, "currentOdometer", void 0);
__decorate([
    Column("numeric", { nullable: true })
], TruckEntity.prototype, "odometerAtLastService", void 0);
__decorate([
    Column("numeric", { nullable: true })
], TruckEntity.prototype, "serviceIntervalKm", void 0);
__decorate([
    Column({ type: "integer", nullable: true })
], TruckEntity.prototype, "wheelConfiguration", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "defaultRouteId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "maintenanceReason", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "nextServiceDate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "engineNumber", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "fuelType", void 0);
__decorate([
    Column("numeric", { nullable: true })
], TruckEntity.prototype, "fuelLevel", void 0);
__decorate([
    Column("numeric", { nullable: true })
], TruckEntity.prototype, "currentFuelLiters", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "branch", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "registrationDate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "vehicleApplication", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "vehicleCode", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "vehicleType", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "ladenWeight", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "unladenWeight", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "tonnage", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "makeYear", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "registrationAddress", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "ownedOutside", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEntity.prototype, "specification", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], TruckEntity.prototype, "healthStatus", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], TruckEntity.prototype, "tyreDetails", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], TruckEntity.prototype, "breakdownHistory", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], TruckEntity.prototype, "serviceHistory", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], TruckEntity.prototype, "inspectionLogs", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], TruckEntity.prototype, "odometerHistory", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], TruckEntity.prototype, "documents", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], TruckEntity.prototype, "tyreRotationHistory", void 0);
TruckEntity = __decorate([
    Entity("trucks")
], TruckEntity);
export { TruckEntity };
let DriverEntity = class DriverEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], DriverEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverEntity.prototype, "trackingId", void 0);
__decorate([
    Column("varchar")
], DriverEntity.prototype, "name", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverEntity.prototype, "email", void 0);
__decorate([
    Column("varchar")
], DriverEntity.prototype, "address", void 0);
__decorate([
    Column("varchar")
], DriverEntity.prototype, "upiId", void 0);
__decorate([
    Column("varchar")
], DriverEntity.prototype, "bankDetails", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverEntity.prototype, "bankName", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverEntity.prototype, "accountNumber", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverEntity.prototype, "ifscCode", void 0);
__decorate([
    Column("varchar")
], DriverEntity.prototype, "phoneNumber", void 0);
__decorate([
    Column("varchar")
], DriverEntity.prototype, "whatsappNumber", void 0);
__decorate([
    Column("varchar")
], DriverEntity.prototype, "licenseExpiry", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverEntity.prototype, "joinDate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverEntity.prototype, "exitDate", void 0);
__decorate([
    Column("numeric", { nullable: true })
], DriverEntity.prototype, "experienceYears", void 0);
__decorate([
    Column({ type: "boolean", default: false })
], DriverEntity.prototype, "isOnline", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverEntity.prototype, "lastLogin", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], DriverEntity.prototype, "documents", void 0);
DriverEntity = __decorate([
    Entity("drivers")
], DriverEntity);
export { DriverEntity };
let TruckEMIEntity = class TruckEMIEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], TruckEMIEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], TruckEMIEntity.prototype, "truckId", void 0);
__decorate([
    Column("varchar")
], TruckEMIEntity.prototype, "bankName", void 0);
__decorate([
    Column("numeric")
], TruckEMIEntity.prototype, "amount", void 0);
__decorate([
    Column("integer")
], TruckEMIEntity.prototype, "dueDate", void 0);
__decorate([
    Column("varchar")
], TruckEMIEntity.prototype, "startDate", void 0);
__decorate([
    Column("integer")
], TruckEMIEntity.prototype, "tenureMonths", void 0);
__decorate([
    Column("integer")
], TruckEMIEntity.prototype, "paidInstallments", void 0);
__decorate([
    Column("numeric")
], TruckEMIEntity.prototype, "totalLoanAmount", void 0);
__decorate([
    Column("varchar")
], TruckEMIEntity.prototype, "status", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], TruckEMIEntity.prototype, "loanType", void 0);
__decorate([
    Column("numeric", { nullable: true })
], TruckEMIEntity.prototype, "interestRate", void 0);
TruckEMIEntity = __decorate([
    Entity("truck_emis")
], TruckEMIEntity);
export { TruckEMIEntity };
let MaintenanceExpenseEntity = class MaintenanceExpenseEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], MaintenanceExpenseEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], MaintenanceExpenseEntity.prototype, "truckId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], MaintenanceExpenseEntity.prototype, "employeeId", void 0);
__decorate([
    Column("varchar")
], MaintenanceExpenseEntity.prototype, "date", void 0);
__decorate([
    Column("varchar")
], MaintenanceExpenseEntity.prototype, "serviceDate", void 0);
__decorate([
    Column("varchar")
], MaintenanceExpenseEntity.prototype, "category", void 0);
__decorate([
    Column("varchar")
], MaintenanceExpenseEntity.prototype, "description", void 0);
__decorate([
    Column("numeric")
], MaintenanceExpenseEntity.prototype, "amount", void 0);
__decorate([
    Column("varchar")
], MaintenanceExpenseEntity.prototype, "workshopName", void 0);
__decorate([
    Column("numeric")
], MaintenanceExpenseEntity.prototype, "odometerReading", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], MaintenanceExpenseEntity.prototype, "partsReplaced", void 0);
__decorate([
    Column("numeric", { nullable: true })
], MaintenanceExpenseEntity.prototype, "nextServiceDueKm", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], MaintenanceExpenseEntity.prototype, "nextServiceDueDate", void 0);
__decorate([
    Column("varchar")
], MaintenanceExpenseEntity.prototype, "status", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], MaintenanceExpenseEntity.prototype, "paidDate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], MaintenanceExpenseEntity.prototype, "dueDate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], MaintenanceExpenseEntity.prototype, "paymentMode", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], MaintenanceExpenseEntity.prototype, "orderId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], MaintenanceExpenseEntity.prototype, "responsibleStaff", void 0);
MaintenanceExpenseEntity = __decorate([
    Entity("maintenance_expenses")
], MaintenanceExpenseEntity);
export { MaintenanceExpenseEntity };
let FuelSiteEntity = class FuelSiteEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], FuelSiteEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelSiteEntity.prototype, "trackingId", void 0);
__decorate([
    Column("varchar")
], FuelSiteEntity.prototype, "companyName", void 0);
__decorate([
    Column("varchar")
], FuelSiteEntity.prototype, "ownerName", void 0);
__decorate([
    Column("varchar")
], FuelSiteEntity.prototype, "phoneNumber", void 0);
__decorate([
    Column("varchar")
], FuelSiteEntity.prototype, "contactEmail", void 0);
__decorate([
    Column("varchar")
], FuelSiteEntity.prototype, "whatsappNumber", void 0);
__decorate([
    Column("varchar")
], FuelSiteEntity.prototype, "gstNumber", void 0);
__decorate([
    Column("varchar")
], FuelSiteEntity.prototype, "address", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelSiteEntity.prototype, "googleMapLink", void 0);
__decorate([
    Column("varchar")
], FuelSiteEntity.prototype, "accountNumber", void 0);
__decorate([
    Column("varchar")
], FuelSiteEntity.prototype, "ifscCode", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelSiteEntity.prototype, "bankName", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelSiteEntity.prototype, "upiId", void 0);
FuelSiteEntity = __decorate([
    Entity("fuel_sites")
], FuelSiteEntity);
export { FuelSiteEntity };
let FuelTransactionEntity = class FuelTransactionEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], FuelTransactionEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], FuelTransactionEntity.prototype, "siteId", void 0);
__decorate([
    Column("varchar")
], FuelTransactionEntity.prototype, "siteName", void 0);
__decorate([
    Column("varchar")
], FuelTransactionEntity.prototype, "truckId", void 0);
__decorate([
    Column("varchar")
], FuelTransactionEntity.prototype, "truckNumber", void 0);
__decorate([
    Column("varchar")
], FuelTransactionEntity.prototype, "driverId", void 0);
__decorate([
    Column("varchar")
], FuelTransactionEntity.prototype, "driverName", void 0);
__decorate([
    Column("numeric")
], FuelTransactionEntity.prototype, "quantity", void 0);
__decorate([
    Column("numeric", { nullable: true })
], FuelTransactionEntity.prototype, "rate", void 0);
__decorate([
    Column("numeric", { nullable: true })
], FuelTransactionEntity.prototype, "totalAmount", void 0);
__decorate([
    Column("varchar")
], FuelTransactionEntity.prototype, "date", void 0);
__decorate([
    Column("varchar")
], FuelTransactionEntity.prototype, "time", void 0);
__decorate([
    Column("numeric", { nullable: true })
], FuelTransactionEntity.prototype, "odometerReading", void 0);
__decorate([
    Column("numeric", { nullable: true })
], FuelTransactionEntity.prototype, "fuelLevelBefore", void 0);
__decorate([
    Column("numeric", { nullable: true })
], FuelTransactionEntity.prototype, "fuelLevelAfter", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "slipUrl", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "notes", void 0);
__decorate([
    Column("varchar")
], FuelTransactionEntity.prototype, "paymentStatus", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "paymentDate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "paymentDueDate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "paymentMode", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "referenceNo", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "tripId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "responsibleStaff", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "fuelCategory", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "bankId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], FuelTransactionEntity.prototype, "bankName", void 0);
FuelTransactionEntity = __decorate([
    Entity("fuel_transactions")
], FuelTransactionEntity);
export { FuelTransactionEntity };
