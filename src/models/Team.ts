export class TeamsClass {
    constructor(
        private id: string,
        private name: string,
        private module: number = 0
    ) {
        this.id = id;
        this.name = name;
        this.module = module;
    }

    public getId(): string {
        return this.id
    }
    public setId(newId: string): void {
        this.id = newId
    }

    public getName(): string {
        return this.name
    }
    public setName(newName: string): void {
        this.name = newName
    }

    public getModule(): number {
        return this.module
    }
    public setPrice(newModule: number): void {
        this.module = newModule
    }
}