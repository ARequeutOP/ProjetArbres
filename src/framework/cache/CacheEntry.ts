export type CacheEntry<T> = {
    metadata: {
        savedAt: number;
    };
    data: T;
}