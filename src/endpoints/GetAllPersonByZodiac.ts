import { PersonClass } from './../models/Person';
import { InstructorsDatabase } from './../database/instructorsDatabase';
import { StudentsDatabase } from '../database/studentsDatabase';
import { Request, Response } from "express";


export const GetAllPersonByZodiac = async (req: Request, res: Response): Promise<void> => {

    let errorCode = 400

    try {

        const zodiacName = req.query.zodiacName as string

        if (!zodiacName) {
            errorCode = 422
            throw new Error("Signo para a busca faltando.")
        }
        if (zodiacName === "Áries" || zodiacName === "Touro" || zodiacName === 'Gêmeos' || zodiacName === 'Câncer' || zodiacName === 'Leão' || zodiacName === 'Virgem' || zodiacName === 'Libra' || zodiacName === 'Escorpião' || zodiacName === 'Sagitário' || zodiacName === 'Capricórnio' || zodiacName === 'Aquário' || zodiacName === 'Peixes') {

            const studentsDatabase = new StudentsDatabase()
            const instructorsDatabase = new InstructorsDatabase()

            const studentsSigns = await studentsDatabase.GetPersonByZodiac()
            const instructorSigns = await instructorsDatabase.GetInstructorsByZodiac()

            const personSigns = instructorSigns.concat(studentsSigns)

    
            const filteredPersonSigns = personSigns.filter((person: any) => {
                return person.Signo == zodiacName
            })
      
            res.status(201).send(filteredPersonSigns)

        } else {
            errorCode = 422
            throw new Error('Signo inválido, o signo precisa ser um dos 12 signos Áries, touro, Gêmeos, Câncer, Leão, Virgem, Libra, Escorpião, Sagitário, Capricórnio, Aquário ou Peixes.')
        }

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}