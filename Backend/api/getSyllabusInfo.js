import fs from 'fs'
let pathSubject = './db/Subjects'

export default async (req, res) => {
    let trimmedSubjectInput = req.query.subject.replace(/[^a-zA-Z0-9]/g, "")
    let trimmedSyllabusInput = req.query.syllabus.replace(/[^a-zA-Z0-9]/g, "")
    
    let pathCurrent = pathSubject + "/" + trimmedSubjectInput

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
        return "Error, Malformed Entry Data"
    }

    if(typeof currentEntryObject[trimmedSyllabusInput] === "undefined"){
        return "Error, Syllabus Not Found"
    }

    if(typeof currentEntryObject[trimmedSyllabusInput] !== "object"){
        return "Error, Malformed Syllabus Data"
    }

    return currentEntryObject[trimmedSyllabusInput]

}