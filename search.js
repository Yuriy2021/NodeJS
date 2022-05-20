const fs = require('fs');
const readStream = new fs.ReadStream('./access.log', 'utf8');
const writeStream = fs.createWriteStream('./processed.log', {
    flags: "a",
    encoding: "utf-8",
  });
const {Transform} = require('stream');
const transformStream = new Transform ({
    transform(chunk, encoding, callback){        
        const transformedChunk = chunk.toString().match(/^89.123.1.41 .*/gm).join('\n');
               
        callback(transformedChunk);
        
    }
});

readStream.pipe(transformStream).pipe(writeStream)

