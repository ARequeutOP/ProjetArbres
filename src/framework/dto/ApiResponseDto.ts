export type ApiResponseDto<T> = {
    total_count: number;
    results: T[];
}