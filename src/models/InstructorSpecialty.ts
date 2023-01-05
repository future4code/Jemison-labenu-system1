export class InstructorSpecialtyClass {
    constructor(
        private instructor_id: string,
        private specialty_id: number,
    ) {
        this.instructor_id = instructor_id
        this.specialty_id = specialty_id
    }

    public getInstructorId() {
        return this.instructor_id
    }
    public setInstructorId(newInstructorId: string) {
        this.instructor_id = newInstructorId
    }

    public getSpecialtyId() {
        return this.specialty_id
    }

    public setSpecialtyId(newSpecialtyId: number) {
        this.specialty_id = newSpecialtyId
    }
}