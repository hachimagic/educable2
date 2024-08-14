import fs from 'fs'
import Sanitize from '../../utility/sanitization.js'
let pathSubject = './db/Subjects'

export default async (req, res) => {
    let SanitizeSubjectInput = Sanitize.AZaz09_Sanitize(req.query.subject)
    
    let pathCurrent = pathSubject + "/" + SanitizeSubjectInput

    // pending authorize-authen system, probably
    try { await fs.promises.access(pathCurrent, fs.constants.R_OK) } catch {
        return "Error, Serverside DB missing"
    }


    try { await fs.promises.access(pathCurrent + "/entry.json", fs.constants.R_OK) } catch {
        return "Error, Cannot Entry File"
    }

    let currentEntryObject
    try {
        let file = await fs.promises.readFile(pathCurrent + "/entry.json")
        currentEntryObject = JSON.parse(file.toString())
    } catch {
        return "Error, Cannot Open/Parse File"
    }

    if(typeof currentEntryObject !== "object"){
        return "Error, Malformed Data"
    }

    return Object.keys(currentEntryObject)

}