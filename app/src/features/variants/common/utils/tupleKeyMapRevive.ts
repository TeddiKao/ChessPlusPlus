import { TupleKeyedMap } from "@itwin/core-bentley";

function reviveTupleKeyedMap(mapToRevive: Record<string, unknown>) {
    const revivedMap = new TupleKeyedMap<any, any>();

    function walk(originalMap: Record<string, unknown>, prefix: unknown[] = []) {
        for (const [key, value] of Object.entries(originalMap)) {
            const tupleKey = [...prefix, key];
            if (value && typeof value === "object" && !Array.isArray(value)) {
                walk(value as Record<string, unknown>, tupleKey);
            } else {
                revivedMap.set(tupleKey, value);
            }
        }
    }

    walk(mapToRevive);

    return revivedMap;
}

export { reviveTupleKeyedMap }