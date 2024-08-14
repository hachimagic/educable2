import fs from 'fs'
import Sanitize from '../../utility/sanitization.js'
let path = './db/Subjects'

export default async (req, res) => {
    //insert quiz-reading api
    // pending authorize-authen system, probably

    let SanitizeSubjectInput = Sanitize.AZaz09_Sanitize(req.query.subject)
    let SanitizeSyllabusInput = Sanitize.AZaz09_Sanitize(req.query.syllabus)
    let SanitizeQuizIDInput = Sanitize.AZaz09_Sanitize(req.query.id.replace)
    
    let pathCurrent = pathSubject + "/" + SanitizeSubjectInput + "/" + SanitizeSyllabusInput + "/quiz/" + SanitizeQuizIDInput+".json"

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