export class DIContainer {
    private dependencies: Map<string, unknown> = new Map<string, unknown>;
    register (key: string, dependency: unknown) {
        if (this.dependencies.has(key)) {
            throw new Error(`Dependency ${key} already declared!`)
        }
        this.dependencies.set(key, dependency);
    };
    resolve<T> (key: string): T {
        const dependency = this.dependencies.get(key);
        if (!dependency) {
            throw new Error(`Dependency ${key} is missing!`);
        }
        return dependency as T;
    };
}