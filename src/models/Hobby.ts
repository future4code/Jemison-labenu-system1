export class HobbyClass {
    constructor(
        private id: number,
        private hobby: string,

    ) {
        this.id = id
        this.hobby = hobby
    }
    public getId() {
        return this.id
    }

    public getHobby() {
        return this.hobby
    }
    public setHobby(newHobby: string) {
        this.hobby = newHobby
    }
}