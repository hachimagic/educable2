import express from 'express'
//import api here
import template from './api/template.js'
import getListSubject from './api/getListSubject.js'
import getSubjectInformation from './api/getSubjectInfo.js'
import getListSyllabus from './api/getListSyllabus.js'
import getSyllabusInfo from './api/getSyllabusInfo.js'


export default () => {

    const app = express()
    const port = 3000
    app.use(express.json()) // for parsing application/json

    //Backend APIS
    //register API here
    getApiRegister('/api/template', template)
    getApiRegister('/api/getListSubject', getListSubject) 
    getApiRegister('/api/getSubjectInformation', getSubjectInformation)
    getApiRegister('/api/getListSyllabus', getListSyllabus)
    getApiRegister('/api/getSyllabusInfo', getSyllabusInfo)
    getApiRegister('/', async (req, res) => {
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
    function getApiRegister(path, callback) {
        app.get(path, (req, res) => {
            console.log("Request: (GET)", req.query, " from ip ", req.ip)
            callback(req, res).then((result) => {
                if (typeof result != "undefined") {
                    res.send(result)
                }
                console.log("Result:", result)
            })
        })
    }

    function postApiRegister(path, callback) {
        app.post(path, (req, res) => {
            console.log("Request (POST):", req.body, " from ip ", req.ip)
            callback(req, res).then((result) => {
                if (typeof result != "undefined") {
                    res.send(result)
                }
                console.log("Result:", result)
            })
        })
    }
}