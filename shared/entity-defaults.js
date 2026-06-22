/**
 * Returns a type-appropriate blank for a TypeORM column type. The type can be a
 * JS constructor (String/Number/Boolean) or a database type string ("varchar",
 * "numeric", "integer", "boolean", "simple-json", ...).
 */
function blankForColumnType(type) {
    if (type === Number ||
        type === "numeric" || type === "decimal" || type === "double" || type === "float" ||
        type === "real" || type === "int" || type === "integer" || type === "smallint" ||
        type === "bigint") {
        return 0;
    }
    if (type === Boolean || type === "boolean" || type === "bool") {
        return false;
    }
    if (type === "simple-json" || type === "json" || type === "jsonb" || type === "simple-array") {
        return [];
    }
    // varchar / text / dates-stored-as-strings / anything else
    return "";
}
/**
 * Fills a type-appropriate blank for every non-nullable, default-less column
 * that is missing (undefined or null) from `data`. This turns an incomplete form
 * submission into a blank value instead of a raw NOT NULL database error such as
 * "Rc Expiry is required and cannot be empty."
 *
 * Primary, generated, and columns that already declare a `default` are left
 * untouched; ownership (`userId`) is expected to be stamped by the caller before
 * this runs. The passed object is mutated in place and also returned.
 */
export function applyColumnDefaults(repo, data) {
    for (const col of repo.metadata.columns) {
        if (col.isPrimary || col.isGenerated || col.isNullable)
            continue;
        if (col.default !== undefined && col.default !== null)
            continue;
        const key = col.propertyName;
        const current = data[key];
        if (current !== undefined && current !== null)
            continue;
        data[key] = blankForColumnType(col.type);
    }
    return data;
}
