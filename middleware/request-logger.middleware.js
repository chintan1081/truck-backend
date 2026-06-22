import { logger } from "../config/logger";
/**
 * Logs one structured line per request on completion, including method, path,
 * status code and latency. Skips Vite/HMR asset noise in development.
 */
export function requestLogger(req, res, next) {
    if (!req.originalUrl.startsWith("/api"))
        return next();
    const start = process.hrtime.bigint();
    res.on("finish", () => {
        const durationMs = Number(process.hrtime.bigint() - start) / 1_000_000;
        logger.info("request", {
            method: req.method,
            url: req.originalUrl,
            status: res.statusCode,
            durationMs: Math.round(durationMs),
        });
    });
    next();
}
