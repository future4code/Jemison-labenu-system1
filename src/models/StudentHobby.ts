export class StudentsHobbiesClass {
    constructor(
        private student_id: string,
        private hobby_id: number,
    ) {
        this.student_id = student_id
        this.hobby_id = hobby_id
    }

    public getSudentId() {
        return this.student_id
    }
    public setStudentId (newStudentId: string) {
        this.student_id = newStudentId
    }

    public getHobbyId() {
        return this.hobby_id
    }

    public setHobbyId (newHobbyId: number) {
        this.hobby_id = newHobbyId
    }
}