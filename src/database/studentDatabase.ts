import {PersonClass} from '../models/Person'
import { BaseDatabase } from './baseDatabase'
import { TABLE_STUDENTS } from './migrations/tableNames'

export class StudentsDatabase extends BaseDatabase{

    TABLE_NAME = TABLE_STUDENTS

}