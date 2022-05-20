const fs = require('fs');
const readStream = new fs.ReadStream('./access.log', 'utf8');
const writeStream = fs.createWriteStream('./processed.log', {
    flags: "a",
    encoding: "utf-8",
});
const { Transform } = require('stream');
const transformStreamFirst = new Transform({
    transform(chunk, encoding, callback) {
        const transformedChunk1 = chunk.toString().match(/^89.123.1.41 .*/gm).join('\n');

        callback(null, transformedChunk1);

    }
});
const transformStreamSecond = new Transform({
    transform(chunk, encoding, callback) {
        const transformedChunk2 = chunk.toString().match(/^34.48.240.111 .*/gm).join('\n');

        callback(null, transformedChunk2);

    }
});

readStream.pipe(transformStreamFirst).pipe(writeStream);
readStream.pipe(transformStreamSecond).pipe(writeStream);


