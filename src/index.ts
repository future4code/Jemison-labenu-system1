import { GetAllPersonByZodiac } from './endpoints/GetAllPersonByZodiac';
import { app } from './app'
import { GetInstructorsPooSpecialists } from './endpoints/GetInstructorsPooSpecialists';
import { ChangeInstructorsTeam } from './endpoints/ChangeInstructorsTeam';
import { GetAllInstructors } from './endpoints/GetAllInstructors';
import { CreateInstructors } from './endpoints/CreateInstructors';
import { GetActiveTeams } from './endpoints/GetActiveTeams';
import { CreateTeams } from './endpoints/CreateTeam';
import { GetAllPersonByTeam } from './endpoints/GetAllPersonsByTeam';
import { CreateStudents } from './endpoints/CreateStudents'
import { GetStudentsByName } from './endpoints/GetStudentsByName'
import { ChangeStudentsTeam } from './endpoints/ChangeStudentsTeam';
import { GetStudentsByHobby } from './endpoints/GetStudentsByHobby';
import { ChangeTeamsModule } from './endpoints/ChangeTeamsModule';


app.post('/students/create', CreateStudents)

app.get('/students/getByName', GetStudentsByName)

app.put('/students/:studentId/changeTeam', ChangeStudentsTeam)

app.get('/students/getByHobby', GetStudentsByHobby)

app.get('/teams/allPersons', GetAllPersonByTeam)

app.post('/teams/create', CreateTeams)

app.get('/teams/active', GetActiveTeams)

app.put('/teams/:teamId/changeModule', ChangeTeamsModule)

app.post('/instructors/create', CreateInstructors)

app.get('/instructors', GetAllInstructors)

app.put('/instructors/:instructorId/changeTeam', ChangeInstructorsTeam)

app.get('/instructors/PooSpecialists', GetInstructorsPooSpecialists)

app.get(`/allPersons/zodiacSigns`, GetAllPersonByZodiac)