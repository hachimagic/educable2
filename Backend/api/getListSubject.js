import fs from 'fs'
let path = './db/Subjects'

export default async (req, res) => {
    // pending authorize-authen system, probably
    try { await fs.promises.access(path, fs.constants.R_OK) } catch {
        return "Error, Serverside DB missing"
    }

    try { await fs.promises.access(path + "/entry.json", fs.constants.R_OK) } catch {
        return "Error, Cannot Entry File"
    }

    let currentEntryObject
    try {
        let file = await fs.promises.readFile(path + "/entry.json")
        currentEntryObject = JSON.parse(file.toString())
    } catch {
        return "Error, Cannot Open/Parse File"
    }

    if(typeof currentEntryObject !== "object"){
        return "Error, Malformed Data"
    }

    return Object.keys(currentEntryObject)

}