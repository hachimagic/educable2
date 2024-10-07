import fs from 'fs'
import file from '../../utility/files.ts'
import Sanitize from '../../utility/sanitization.ts'
let path = './db/Subjects'

export default async (req:any, res:any):Promise<string> => {
    let SanitizeSubjectInput = Sanitize.AZaz09_Sanitize(req.query.subject)
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

    let output:string
    try {
        output = JSON.stringify(await file.listDirectory(currentPath))
    } catch {
        return "Error, Unknown Error Occurred"
    }

    return output

}