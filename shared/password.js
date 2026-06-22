import crypto from "crypto";
/**
 * Password hashing using Node's built-in scrypt. Salts are random per-user and
 * stored alongside the hash; verification is constant-time.
 */
export function hashPassword(password, salt) {
    const s = salt || crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(password, s, 64).toString("hex");
    return { hash, salt: s };
}
export function verifyPassword(password, hash, salt) {
    const { hash: candidate } = hashPassword(password, salt);
    const a = Buffer.from(candidate, "hex");
    const b = Buffer.from(hash, "hex");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
}
