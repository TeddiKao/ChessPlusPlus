import { hasInternalMap } from "@/shared/utils/typeChecks";
import { TupleKeyedMap } from "@itwin/core-bentley";

function reviveTupleKeyedMap<K extends readonly unknown[], V>(mapToRevive: unknown): TupleKeyedMap<K, V> {
    if (!hasInternalMap(mapToRevive)) return new TupleKeyedMap<K, V>();

    const revivedMap = new TupleKeyedMap<K, V>();

    function walkMap(map: Map<unknown, unknown>, prefix: readonly unknown[] = []) {
        for (const [key, value] of Array.from(map)) {
            const mapKey = [...prefix, key] as unknown as K;
            if (value instanceof Map) {
                walkMap(value, mapKey);
            } else {
                revivedMap.set(mapKey, value as V);
            }
        }
    }

    walkMap(mapToRevive._map);

    return revivedMap;
}

export { reviveTupleKeyedMap }