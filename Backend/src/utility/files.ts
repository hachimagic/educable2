import fs from 'fs'
class FileSystemUtility{
    async listDirectory(path: string) {// No sanitization
        return await fs.promises.readdir(path)
    }
}
export default new FileSystemUtility() //object export