import fs from 'fs'
import file from '../../utility/files.ts'
import Sanitize from '../../utility/sanitization.ts'
let path = './db/Subjects'

export default async (req:any, res:any):Promise<string> => {
    // pending authorize-authen system, probably
    try { await fs.promises.access(path, fs.constants.R_OK) } catch {
        return "Error, Serverside DB missing"
    }

    let output:string
    try {
        output = JSON.stringify(await file.listDirectory(path))
    } catch {
        return "Error, Unknown Error Occurred"
    }

    return output

}