const socket = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, "./index.html");
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});
let counts = 0;
const io = socket(server);


io.on('connection', function (client) {
    client.on('disconnect', function (data) {
        console.log('User disconnected');
        counts -= 1;
        client.broadcast.emit("disconnected", { message: 'The client disconnected', counts });

    });
});
io.on("connection", (client) => {
    console.log("Connected");
    counts += 1;
    const shortName = uniqueNamesGenerator({
        dictionaries: [adjectives, animals],
        length: 2
    });
    client.on("connected", (data) => {

        client.broadcast.emit("connected", { message: 'The new client connected', counts, shortName });
        client.emit("connected", { message: 'The new client connected', counts, shortName });
        console.log(shortName);
    });

    client.on("newMessage", (data) => {
        console.log(data);
        client.broadcast.emit("newMessage", data, shortName);
        client.emit("newMessage", data, shortName);
    });

});


server.listen(8085);