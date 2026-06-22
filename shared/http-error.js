/**
 * Typed HTTP error. Throw this anywhere in a request lifecycle and the central
 * error handler will translate it into the right status code and JSON body.
 */
export class HttpError extends Error {
    constructor(statusCode, message, details) {
        super(message);
        this.name = "HttpError";
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace?.(this, HttpError);
    }
}
export const badRequest = (message, details) => new HttpError(400, message, details);
export const unauthorized = (message = "Unauthorized") => new HttpError(401, message);
export const forbidden = (message = "Forbidden") => new HttpError(403, message);
export const notFound = (message = "Not found") => new HttpError(404, message);
export const conflict = (message) => new HttpError(409, message);
