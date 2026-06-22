var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OwnedEntity } from "./base.entity";
let EmployeeEntity = class EmployeeEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], EmployeeEntity.prototype, "id", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], EmployeeEntity.prototype, "trackingId", void 0);
__decorate([
    Column("varchar")
], EmployeeEntity.prototype, "fullName", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], EmployeeEntity.prototype, "email", void 0);
__decorate([
    Column("varchar")
], EmployeeEntity.prototype, "phoneNumber", void 0);
__decorate([
    Column("varchar")
], EmployeeEntity.prototype, "whatsappNumber", void 0);
__decorate([
    Column("varchar")
], EmployeeEntity.prototype, "address", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], EmployeeEntity.prototype, "designation", void 0);
__decorate([
    Column("varchar")
], EmployeeEntity.prototype, "joinDate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], EmployeeEntity.prototype, "exitDate", void 0);
__decorate([
    Column("numeric", { nullable: true })
], EmployeeEntity.prototype, "experienceYears", void 0);
__decorate([
    Column({ type: "boolean", default: false })
], EmployeeEntity.prototype, "isOnline", void 0);
__decorate([
    Column("simple-json")
], EmployeeEntity.prototype, "bankAccountDetails", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], EmployeeEntity.prototype, "documents", void 0);
EmployeeEntity = __decorate([
    Entity("employees")
], EmployeeEntity);
export { EmployeeEntity };
let DriverSalaryEntity = class DriverSalaryEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], DriverSalaryEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], DriverSalaryEntity.prototype, "driverId", void 0);
__decorate([
    Column("varchar")
], DriverSalaryEntity.prototype, "driverName", void 0);
__decorate([
    Column("varchar")
], DriverSalaryEntity.prototype, "month", void 0);
__decorate([
    Column("varchar")
], DriverSalaryEntity.prototype, "salaryType", void 0);
__decorate([
    Column("numeric")
], DriverSalaryEntity.prototype, "baseRate", void 0);
__decorate([
    Column("numeric")
], DriverSalaryEntity.prototype, "presentDays", void 0);
__decorate([
    Column("numeric")
], DriverSalaryEntity.prototype, "bonus", void 0);
__decorate([
    Column("numeric")
], DriverSalaryEntity.prototype, "deductions", void 0);
__decorate([
    Column("numeric")
], DriverSalaryEntity.prototype, "advanceAdjusted", void 0);
__decorate([
    Column("numeric")
], DriverSalaryEntity.prototype, "totalAmount", void 0);
__decorate([
    Column("varchar")
], DriverSalaryEntity.prototype, "dateGiven", void 0);
__decorate([
    Column("varchar")
], DriverSalaryEntity.prototype, "paymentMode", void 0);
__decorate([
    Column("varchar")
], DriverSalaryEntity.prototype, "referenceNo", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverSalaryEntity.prototype, "notes", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverSalaryEntity.prototype, "bankId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], DriverSalaryEntity.prototype, "bankName", void 0);
DriverSalaryEntity = __decorate([
    Entity("driver_salaries")
], DriverSalaryEntity);
export { DriverSalaryEntity };
let EmployeeSalaryEntity = class EmployeeSalaryEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], EmployeeSalaryEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], EmployeeSalaryEntity.prototype, "employeeId", void 0);
__decorate([
    Column("varchar")
], EmployeeSalaryEntity.prototype, "employeeName", void 0);
__decorate([
    Column("varchar")
], EmployeeSalaryEntity.prototype, "salaryType", void 0);
__decorate([
    Column("varchar")
], EmployeeSalaryEntity.prototype, "salaryMonth", void 0);
__decorate([
    Column("varchar")
], EmployeeSalaryEntity.prototype, "dateGiven", void 0);
__decorate([
    Column("numeric")
], EmployeeSalaryEntity.prototype, "baseAmount", void 0);
__decorate([
    Column("numeric")
], EmployeeSalaryEntity.prototype, "bonus", void 0);
__decorate([
    Column("numeric")
], EmployeeSalaryEntity.prototype, "deductions", void 0);
__decorate([
    Column("numeric")
], EmployeeSalaryEntity.prototype, "advanceAdjusted", void 0);
__decorate([
    Column("numeric")
], EmployeeSalaryEntity.prototype, "netAmount", void 0);
__decorate([
    Column("varchar")
], EmployeeSalaryEntity.prototype, "paymentMode", void 0);
__decorate([
    Column("varchar")
], EmployeeSalaryEntity.prototype, "referenceNo", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], EmployeeSalaryEntity.prototype, "notes", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], EmployeeSalaryEntity.prototype, "bankId", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], EmployeeSalaryEntity.prototype, "bankName", void 0);
EmployeeSalaryEntity = __decorate([
    Entity("employee_salaries")
], EmployeeSalaryEntity);
export { EmployeeSalaryEntity };
let AttendanceRecordEntity = class AttendanceRecordEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], AttendanceRecordEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], AttendanceRecordEntity.prototype, "entityId", void 0);
__decorate([
    Column("varchar")
], AttendanceRecordEntity.prototype, "date", void 0);
__decorate([
    Column("varchar")
], AttendanceRecordEntity.prototype, "status", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], AttendanceRecordEntity.prototype, "checkIn", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], AttendanceRecordEntity.prototype, "checkOut", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], AttendanceRecordEntity.prototype, "notes", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], AttendanceRecordEntity.prototype, "shift", void 0);
__decorate([
    Column({ type: "boolean", nullable: true })
], AttendanceRecordEntity.prototype, "isLate", void 0);
__decorate([
    Column("numeric", { nullable: true })
], AttendanceRecordEntity.prototype, "overtimeHours", void 0);
__decorate([
    Column({ type: "boolean", nullable: true })
], AttendanceRecordEntity.prototype, "locationVerified", void 0);
AttendanceRecordEntity = __decorate([
    Entity("attendance_records")
], AttendanceRecordEntity);
export { AttendanceRecordEntity };
let LeaveRequestEntity = class LeaveRequestEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], LeaveRequestEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], LeaveRequestEntity.prototype, "entityId", void 0);
__decorate([
    Column("varchar")
], LeaveRequestEntity.prototype, "startDate", void 0);
__decorate([
    Column("varchar")
], LeaveRequestEntity.prototype, "endDate", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], LeaveRequestEntity.prototype, "type", void 0);
__decorate([
    Column("varchar")
], LeaveRequestEntity.prototype, "reason", void 0);
__decorate([
    Column("varchar")
], LeaveRequestEntity.prototype, "status", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], LeaveRequestEntity.prototype, "appliedDate", void 0);
__decorate([
    Column({ type: "boolean", nullable: true })
], LeaveRequestEntity.prototype, "hasDocuments", void 0);
__decorate([
    Column({ type: "boolean", nullable: true })
], LeaveRequestEntity.prototype, "isPartialDay", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], LeaveRequestEntity.prototype, "partialSlot", void 0);
__decorate([
    Column("numeric", { nullable: true })
], LeaveRequestEntity.prototype, "balanceAtTime", void 0);
LeaveRequestEntity = __decorate([
    Entity("leave_requests")
], LeaveRequestEntity);
export { LeaveRequestEntity };
let PerformanceMetricEntity = class PerformanceMetricEntity extends OwnedEntity {
};
__decorate([
    PrimaryGeneratedColumn("uuid")
], PerformanceMetricEntity.prototype, "id", void 0);
__decorate([
    Column("varchar")
], PerformanceMetricEntity.prototype, "entityId", void 0);
__decorate([
    Column("varchar")
], PerformanceMetricEntity.prototype, "date", void 0);
__decorate([
    Column("numeric", { default: 0 })
], PerformanceMetricEntity.prototype, "efficiencyScore", void 0);
__decorate([
    Column("numeric", { default: 0 })
], PerformanceMetricEntity.prototype, "tasksCompleted", void 0);
__decorate([
    Column("numeric", { default: 0 })
], PerformanceMetricEntity.prototype, "rating", void 0);
__decorate([
    Column({ type: "varchar", nullable: true })
], PerformanceMetricEntity.prototype, "feedback", void 0);
__decorate([
    Column("numeric", { nullable: true })
], PerformanceMetricEntity.prototype, "safetyIncidents", void 0);
__decorate([
    Column("numeric", { nullable: true })
], PerformanceMetricEntity.prototype, "fuelEfficiencyScore", void 0);
__decorate([
    Column("simple-json", { nullable: true })
], PerformanceMetricEntity.prototype, "skills", void 0);
__decorate([
    Column("numeric", { nullable: true })
], PerformanceMetricEntity.prototype, "kudosCount", void 0);
__decorate([
    Column("numeric", { nullable: true })
], PerformanceMetricEntity.prototype, "goalsProgress", void 0);
__decorate([
    Column("numeric", { nullable: true })
], PerformanceMetricEntity.prototype, "operationalEfficiency", void 0);
__decorate([
    Column("numeric", { nullable: true })
], PerformanceMetricEntity.prototype, "safetyCompliance", void 0);
__decorate([
    Column("numeric", { nullable: true })
], PerformanceMetricEntity.prototype, "loadCycleTiming", void 0);
__decorate([
    Column("numeric", { nullable: true })
], PerformanceMetricEntity.prototype, "serviceRating", void 0);
PerformanceMetricEntity = __decorate([
    Entity("performance_metrics")
], PerformanceMetricEntity);
export { PerformanceMetricEntity };
