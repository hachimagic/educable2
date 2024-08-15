import express from 'express'
//import api here
import template from './api/template/template.ts'
import getListSubject from './api/Subject/getListSubject.ts'
import getSubjectInfo from './api/Subject/getSubjectInfo.ts'
import getListSyllabus from './api/Syllabus/getListSyllabus.ts'
import getSyllabusInfo from './api/Syllabus/getSyllabusInfo.ts'
import getQuizList from './api/Quiz/getQuizList.ts'
import getQuizObject from './api/Quiz/getQuizObject.ts'

const server = () => {

    const app = express()
    const port = 3000
    app.use(express.json()) // for parsing application/json

    //Backend APIS
    //register API hereget
    getApiRegister('/api/template', template)
    getApiRegister('/api/getListSubject', getListSubject) 
    getApiRegister('/api/getSubjectInfo', getSubjectInfo)

    getApiRegister('/api/getListSyllabus', getListSyllabus)
    getApiRegister('/api/getSyllabusInfo', getSyllabusInfo)

    getApiRegister('/api/getListQuiz', getQuizList)
    getApiRegister('/api/getQuizContent', getQuizObject)

    getApiRegister('/', async (req:any, res:any) => {
        return 'Hello World!'
    })
    //Serve the page, i guess.

    //app.get('/', (req, res) => {
    //    res.send('Hello World!')
    //})

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })

    // idk i felt like making a wrapper
    // logs stuff
    function getApiRegister(path:string, callback:Function) {
        app.get(path, (req, res) => {
            console.log("Request: (GET)", req.query, " from ip ", req.ip)
            callback(req, res).then((result:string) => {
                if (typeof result != "undefined") {
                    res.send(result)
                }
                console.log("Result:", result)
            })
        })
    }

    function postApiRegister(path:string, callback:Function) {
        app.post(path, (req, res) => {
            console.log("Request (POST):", req.body, " from ip ", req.ip)
            callback(req, res).then((result:string) => {
                if (typeof result != "undefined") {
                    res.send(result)
                }
                console.log("Result:", result)
            })
        })
    }
}

if (require.main === module) {
    console.log('single thread starting');
    server()
}else{
    
}
export default server;