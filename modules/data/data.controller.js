import { clampInt } from "../../shared/pagination";
import { HttpError } from "../../shared/http-error";
import { logger } from "../../config/logger";
import { SettingsEntity, TruckEntity, DriverEntity, ClientEntity, SiteEntity, RouteEntity, BrokerEntity, EmployeeEntity, BankEntity, ItemProductEntity, OrderEntity, ExpenseEntity, InvoiceEntity, DriverSalaryEntity, EmployeeSalaryEntity, TruckEMIEntity, MaintenanceExpenseEntity, CustomAlertEntity, PlantAdvanceEntity, PlantAdvancePoolEntryEntity, StationRateEntity, FuelSiteEntity, FuelTransactionEntity, BankTransactionEntity, PaymentRecordEntity, AttendanceRecordEntity, LeaveRequestEntity, PerformanceMetricEntity, } from "../../db/entities";
const DEFAULT_SETTINGS = {
    dieselApprovalRequired: true,
    limitStrictEnforcement: true,
    companyName: "FlyAsh Logistics Pro",
    companyEmail: "admin@flyashpro.com",
    companyContact: "+91 98765 43210",
    companyWhatsapp: "+91 98765 43210",
    companyAddress: "Industrial Hub, Sector 5, Greater Noida",
    companyServices: ["FlyAsh Logistics", "Bulk Transportation", "Fleet Management"],
};
export async function getAllData(req, res) {
    try {
        const db = req.db;
        const userId = req.user.id;
        const lim = (key, def = 200) => clampInt(req.query[key], 1, 1000, def);
        const settings = await db.getRepository(SettingsEntity).findOne({ where: { userId } });
        const heavy = async (repo, key, take = 200) => {
            const [data, total] = await repo.findAndCount({
                where: { userId },
                take: lim(key, take),
                order: { id: "DESC" },
            });
            return { data, total };
        };
        const light = (repo) => repo.find({ where: { userId } });
        const [ordersR, expensesR, fleet, drivers, clients, sites, routes, brokers, employees, banks, itemProducts, bankTxR, paymentRecsR, invoicesR, salariesR, empSalariesR, emis, maintenanceR, customAlerts, plantAdvancesR, plantAdvancePoolR, stationRates, fuelSites, attendanceR, leaves, performance, fuelTransactionsR,] = await Promise.all([
            heavy(db.getRepository(OrderEntity), "orders"),
            heavy(db.getRepository(ExpenseEntity), "expenses"),
            light(db.getRepository(TruckEntity)),
            light(db.getRepository(DriverEntity)),
            light(db.getRepository(ClientEntity)),
            light(db.getRepository(SiteEntity)),
            light(db.getRepository(RouteEntity)),
            light(db.getRepository(BrokerEntity)),
            light(db.getRepository(EmployeeEntity)),
            light(db.getRepository(BankEntity)),
            light(db.getRepository(ItemProductEntity)),
            heavy(db.getRepository(BankTransactionEntity), "bankTransactions"),
            heavy(db.getRepository(PaymentRecordEntity), "paymentRecords"),
            heavy(db.getRepository(InvoiceEntity), "invoices"),
            heavy(db.getRepository(DriverSalaryEntity), "salaries"),
            heavy(db.getRepository(EmployeeSalaryEntity), "employeeSalaries"),
            light(db.getRepository(TruckEMIEntity)),
            heavy(db.getRepository(MaintenanceExpenseEntity), "maintenance"),
            light(db.getRepository(CustomAlertEntity)),
            heavy(db.getRepository(PlantAdvanceEntity), "plantAdvances"),
            heavy(db.getRepository(PlantAdvancePoolEntryEntity), "plantAdvancePool"),
            light(db.getRepository(StationRateEntity)),
            light(db.getRepository(FuelSiteEntity)),
            heavy(db.getRepository(AttendanceRecordEntity), "attendance"),
            light(db.getRepository(LeaveRequestEntity)),
            light(db.getRepository(PerformanceMetricEntity)),
            heavy(db.getRepository(FuelTransactionEntity), "fuelTransactions"),
        ]);
        res.json({
            settings: settings || DEFAULT_SETTINGS,
            orders: ordersR.data,
            expenses: expensesR.data,
            fleet, drivers, clients, sites, routes, brokers, employees, banks, itemProducts,
            bankTransactions: bankTxR.data,
            paymentRecords: paymentRecsR.data,
            invoices: invoicesR.data,
            salaries: salariesR.data,
            employeeSalaries: empSalariesR.data,
            emis,
            maintenance: maintenanceR.data,
            customAlerts,
            plantAdvances: plantAdvancesR.data,
            plantAdvancePool: plantAdvancePoolR.data,
            stationRates, fuelSites,
            attendance: attendanceR.data,
            leaves, performance,
            fuelTransactions: fuelTransactionsR.data,
            _meta: {
                totals: {
                    orders: ordersR.total,
                    expenses: expensesR.total,
                    bankTransactions: bankTxR.total,
                    paymentRecords: paymentRecsR.total,
                    invoices: invoicesR.total,
                    salaries: salariesR.total,
                    employeeSalaries: empSalariesR.total,
                    maintenance: maintenanceR.total,
                    plantAdvances: plantAdvancesR.total,
                    plantAdvancePool: plantAdvancePoolR.total,
                    attendance: attendanceR.total,
                    fuelTransactions: fuelTransactionsR.total,
                },
            },
        });
    }
    catch (err) {
        if (err instanceof HttpError)
            throw err;
        logger.error("getAllData error", { message: err instanceof Error ? err.message : String(err) });
        throw new HttpError(500, "Failed to load workspace data. Please try again.");
    }
}
export async function updateSettings(req, res) {
    try {
        const userId = req.user.id;
        const repo = req.db.getRepository(SettingsEntity);
        let settings = await repo.findOne({ where: { userId } });
        if (!settings) {
            settings = new SettingsEntity();
            settings.userId = userId;
        }
        const body = { ...req.body };
        delete body.id;
        delete body.userId;
        delete body.user;
        repo.merge(settings, body);
        settings.userId = userId;
        res.json(await repo.save(settings));
    }
    catch (err) {
        if (err instanceof HttpError)
            throw err;
        throw new HttpError(500, "Failed to save settings. Please try again.");
    }
}
