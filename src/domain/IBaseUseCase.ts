export type IBaseUseCase<T, U> = {
    execute(params: T): Promise<U>;
}