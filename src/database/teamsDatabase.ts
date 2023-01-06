import { TeamsClass } from './../models/Team';
import { BaseDatabase } from './baseDatabase'
import { TABLE_TEAMS } from './migrations/tableNames'

export class TeamsDatabase extends BaseDatabase {

    TABLE_NAME = TABLE_TEAMS

    public async CreateTeam(team: TeamsClass) {
        return super.CreateItem(team);
    }

    public async TeamExistsByName(teamName: string) {
        const teamExistsByName = await TeamsDatabase.connection(this.TABLE_NAME).select('id').where('name', teamName)
        return teamExistsByName
    }

    public async TeamExistsById(teamId: string) {
        const teamExistsById = await TeamsDatabase.connection(this.TABLE_NAME).where('id', teamId)
        return teamExistsById[0]
    }

}
    
