import fs from 'fs'
let path = './db/Subjects'

export default async (req, res) => {
    //insert quiz-reading api
    // pending authorize-authen system, probably

    let trimmedSubjectInput = req.query.subject.replace(/[^a-zA-Z0-9]/g, "")
    let trimmedSyllabusInput = req.query.syllabus.replace(/[^a-zA-Z0-9]/g, "")
    let trimmedQuizIDInput = req.query.id.replace(/[^a-zA-Z0-9]/g, "")
    
    let pathCurrent = pathSubject + "/" + trimmedSubjectInput + "/" + trimmedSyllabusInput + "/quiz/" + trimmedSubjectInput+".json"

    try { await fs.promises.access(path, fs.constants.R_OK) } catch {
        return "Error, Serverside DB missing"
    }

    let currentEntryObject
    try {
        let file = await fs.promises.readFile(pathCurrent)
        currentEntryObject = JSON.parse(file.toString())
    } catch {
        return "Error, Cannot Open/Parse File"
    }

    if(typeof currentEntryObject !== "object"){
        return "Error, Malformed Data"
    }

    return Object.keys(currentEntryObject)

}