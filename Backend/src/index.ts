
import cluster from "cluster";
import server from './server.ts'
const numProcess = 4;



var _previous_console_log = console.log;
console.log = function (...args) {
    let prefix = "--:-- ## Primary : "
    if (cluster.isWorker) {
        prefix = "--:-- ## Worker - " + cluster.worker?.id + " : "
    }
    return _previous_console_log(prefix, ...args);
}



if (cluster.isPrimary) {
    console.log("Starting "+numProcess+" Fork(s).....")
    for (let i = 0; i < numProcess; i++) {
        cluster.fork();
    }
} else {
    server()
}
