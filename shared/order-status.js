import { conflict } from "./http-error";
// Forward-only lifecycle. ASSIGNED is implicit when a truck is attached.
const ALLOWED = {
    CREATED: ["CREATED", "ASSIGNED"],
    ASSIGNED: ["ASSIGNED", "PICKED", "CREATED"], // allow un-assign back to CREATED
    PICKED: ["PICKED", "DELIVERED"],
    DELIVERED: ["DELIVERED", "INVOICED"],
    INVOICED: ["INVOICED", "PAID"],
    PAID: ["PAID"],
};
export function canTransition(from, to) {
    const next = ALLOWED[from];
    return !!next && next.includes(to);
}
export function assertTransition(from, to) {
    if (!canTransition(from, to)) {
        throw conflict(`Illegal order status transition: ${from} -> ${to}`);
    }
}
