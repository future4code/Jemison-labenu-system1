import { SpecialtyClass } from '../models/Specialty';
import { BaseDatabase } from './baseDatabase'
import { TABLE_SPECIALTIES } from './migrations/tableNames'

export class SpecialtiesDatabase extends BaseDatabase {

    TABLE_NAME = TABLE_SPECIALTIES

    public async GetAllSpecialties() {
        const result = await SpecialtiesDatabase.connection(this.TABLE_NAME)
        return result
    }

    public async CreateSpecialty(specialty: SpecialtyClass) {
        return super.CreateItem(specialty)
    }

    public async SpecialtyExists(specialty: string) {
        const specialtyExists = await SpecialtiesDatabase.connection(this.TABLE_NAME).where('specialty', specialty)
        return specialtyExists
    }
}