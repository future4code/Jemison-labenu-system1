import { GetAllPersonByTeam } from './endpoints/GetAllPersonsByTeam';
import {app} from './app'
import { CreateStudents } from './endpoints/CreateStudents'
import { GetStudentsByName } from './endpoints/GetStudentsByName'
import { ChangeStudentsTeam } from './endpoints/ChangeStudentsTeam';
import { GetStudentsByHobby } from './endpoints/GetStudentsByHobby';

app.post('/students/create', CreateStudents)

app.get('/students/getByName', GetStudentsByName)

app.put('/students/:studentId/changeTeam', ChangeStudentsTeam)

app.get('/students/getByHobby', GetStudentsByHobby)

app.get('/team/allPersons', GetAllPersonByTeam)