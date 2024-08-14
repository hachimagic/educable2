import fs from 'fs'
import Sanitize from '../../utility/sanitization.js'
let path = './db/Subjects'

export default async (req, res) => {
    let SanitizeSubjectInput = Sanitize.AZaz09_Sanitize(req.query.subject)
    // pending authorize-authen system, probably
    try { await fs.promises.access(path, fs.constants.R_OK) } catch {
        return "Error, Serverside DB missing"
    }


    try { await fs.promises.access(path + "/entry.json", fs.constants.R_OK) } catch {
        return "Error, Cannot Find Entry File"
    }

    let currentEntryObject
    try {
        let file = await fs.promises.readFile(path + "/entry.json")
        currentEntryObject = JSON.parse(file.toString())
    } catch {
        return "Error, Cannot Open/Parse File"
    }

    if(typeof currentEntryObject !== "object" || typeof currentEntryObject[SanitizeSubjectInput] === "undefined"){
        return "Error, Cannot Find Subject"
    }

    return currentEntryObject[SanitizeSubjectInput]

}