export class SpecialtyClass {
    constructor(
        private id: number,
        private specialty: string,

    ) {
        this.id = id
        this.specialty = specialty
    }
    public getId() {
        return this.id
    }

    public getSpecialty() {
        return this.specialty
    }
    public setSpecialty(newSpecialty: string) {
        this.specialty = newSpecialty
    }
}