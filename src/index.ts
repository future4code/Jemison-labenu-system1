import {app} from './app'
import { CreateStudents } from './endpoints/CreateStudents'

app.post('/students/create', CreateStudents)