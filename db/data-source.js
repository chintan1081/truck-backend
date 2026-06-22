import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "../config/env";
import { logger } from "../config/logger";
import { ENTITIES } from "./entities";
let appDataSource = null;
let initPromise = null;
function buildDataSource() {
    return new DataSource({
        type: "postgres",
        url: config.db.url,
        schema: config.db.schema,
        synchronize: true,
        migrationsRun: false,
        logging: config.db.logging,
        entities: ENTITIES,
    });
}
/**
 * Returns the initialised application DataSource, creating it on first use.
 * Concurrent callers during startup share a single initialise promise.
 */
export async function getDataSource() {
    if (appDataSource && appDataSource.isInitialized)
        return appDataSource;
    if (initPromise)
        return initPromise;
    initPromise = (async () => {
        const ds = buildDataSource();
        await ds.initialize();
        appDataSource = ds;
        logger.info("Database connected", { schema: config.db.schema });
        return ds;
    })();
    return initPromise;
}
/** Closes the connection. Called during graceful shutdown. */
export async function closeDataSource() {
    if (appDataSource?.isInitialized) {
        await appDataSource.destroy();
    }
    appDataSource = null;
    initPromise = null;
    logger.info("Database connection closed");
}
