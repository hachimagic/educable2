import fs from 'fs'
import Sanitize from '../../utility/sanitization.ts'
let path = './db/Subjects'

export default async (req:any, res:any):Promise<string> => {
    let SanitizeSubjectInput = Sanitize.AZaz09_Sanitize(req.query.subject)
    let SanitizeSyllabusInput = Sanitize.AZaz09_Sanitize(req.query.syllabus)

    // pending authorize-authen system, probably
    try { await fs.promises.access(path, fs.constants.R_OK) } catch {
        return "Error, Serverside DB missing"
    }

    let currentPath = path + "/" + SanitizeSubjectInput

    try { await fs.promises.access(currentPath, fs.constants.R_OK) } catch {
        return "Error, No Subject Found of "+SanitizeSubjectInput
    }

    currentPath = currentPath + "/Syllabus"

    try { await fs.promises.access(currentPath, fs.constants.R_OK) } catch {
        return "Error, No Syllabus Found in "+SanitizeSubjectInput
    }
    
    currentPath = currentPath + "/" + SanitizeSyllabusInput

    try { await fs.promises.access(currentPath + "/entry.json", fs.constants.R_OK) } catch {
        return "Error, Cannot Find Entry File"
    }

    let currentEntryObject
    try {
        let file = await fs.promises.readFile(currentPath + "/entry.json")
        currentEntryObject = JSON.parse(file.toString())
    } catch {
        return "Error, Cannot Open/Parse File"
    }

    /*if(typeof currentEntryObject !== "object" || typeof currentEntryObject[SanitizeSubjectInput] === "undefined"){
        return "Error, Cannot Find Subject"
    }*/

    return currentEntryObject

}