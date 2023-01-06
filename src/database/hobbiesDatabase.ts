import { HobbyClass } from '../models/Hobby';
import { BaseDatabase } from './baseDatabase'
import { TABLE_HOBBIES } from './migrations/tableNames'

export class HobbiesDatabase extends BaseDatabase {

    TABLE_NAME = TABLE_HOBBIES

    public async GetAllHobbies(){
        return super.GetAll();
    }

    public async CreateHobby(hobby: HobbyClass){
        return super.CreateItem(hobby)
    }

    public async HobbyExists(hobby: string){
        const hobbyExists = await HobbiesDatabase.connection(this.TABLE_NAME).where('hobby', hobby)
        console.log(hobbyExists)
        return hobbyExists  
    }

    
    }

