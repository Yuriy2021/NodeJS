const { workerData, parentPort } = require('worker_threads');

parentPort.postMessage({ result: `You want to implenet filter to ${workerData}` });



const readStream = new fs.ReadStream('./access.log', 'utf8');
const writeStreamFirst = fs.createWriteStream('./%89.123.1.41%.log', {
    flags: "a",
    encoding: "utf-8",
});

const { Transform } = require('stream');
const transformStreamFirst = new Transform({
    transform(chunk, encoding, callback) {

        const transformedChunk = chunk.toString().match(/^89.123.1.41 .*/gm).join('\n');

        callback(null, transformedChunk);

    }
});

readStream.pipe(transformStreamFirst).pipe(writeStreamFirst);