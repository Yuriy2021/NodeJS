const { Worker } = require('worker_threads');
const fs = require('fs');
const path = require("path");
function start(workerData) {
    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', { workerData });
        worker.on('message', resolve);
        worker.on('error', reject);
    })
}
start('./access.log')
    .then(result => console.log(result))
    .catch(err => console.log(err));