
export class PersonClass {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private birth: string,
        private team_id?: string
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.birth = birth
        this.team_id = team_id
    }
public getId(){
    return this.id
}
public setId(newId:string){
    this.id = newId
}

public getName(){
    return this.name
}
public setName(newName:string){
    this.name = newName
}

public getEmail(){
    return this.email
}
public setEmail(newEmail:string){
    this.email = newEmail
}

public getBirth(){
    return this.birth
}
public setBirth(newBirth:string){
    this.birth = newBirth
}

public getTeamId(){
    return this.team_id
}
public setTeamId(newTeamId:string){
    this.team_id = newTeamId
}

}
