import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  UpdateEvent,
  LoadEvent,
} from "typeorm";

/**
 * Postgres returns `numeric` / `decimal` columns as strings to preserve
 * precision. This subscriber coerces them back to JS numbers after every
 * load so the rest of the stack (API responses, frontend forms, validation
 * middleware) always sees proper numbers.
 */
@EventSubscriber()
export class NumericCoercionSubscriber implements EntitySubscriberInterface {
  afterLoad(entity: any, event?: LoadEvent<any>): void {
    if (!event?.metadata) return;
    for (const col of event.metadata.columns) {
      if (
        (col.type === "numeric" || col.type === "decimal") &&
        typeof entity[col.propertyName] === "string"
      ) {
        const n = Number(entity[col.propertyName]);
        if (Number.isFinite(n)) entity[col.propertyName] = n;
      }
    }
  }
}
