import fs from 'fs'
import file from '../../utility/files.ts'
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

    try { await fs.promises.access(currentPath, fs.constants.R_OK) } catch {
        return "Error, No Syllabus Found of "+SanitizeSubjectInput+"/"+SanitizeSyllabusInput
    }

    currentPath = currentPath + "/courses"

    try { await fs.promises.access(currentPath, fs.constants.R_OK) } catch {
        return "Error, No Course Found in "+SanitizeSubjectInput+"/"+SanitizeSyllabusInput
    }

    let output:string
    try {
        let unformattedOutput = await file.listDirectory(currentPath)
        output = JSON.stringify(unformattedOutput.map(x=>x.split(".")[0]))
    } catch {
        return "Error, Unknown Error Occurred"
    }

    return output

}