/**
 * Dependency-free baseline security headers (a lightweight subset of what helmet
 * would set). Applied to every response. Kept conservative so it doesn't break
 * the SPA / Vite dev middleware.
 */
export function securityHeaders(_req, res, next) {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-DNS-Prefetch-Control", "off");
    res.removeHeader("X-Powered-By");
    next();
}
