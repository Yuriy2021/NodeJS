const socket = require("socket.io");
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
    const indexPath = path.join(__dirname, "./index.html");
    const readStream = fs.createReadStream(indexPath);

    readStream.pipe(res);
});

const io = socket(server);

io.on('connection', function (client) {
    client.on('disconnect', function (data) {
        console.log('User disconnected');
        client.broadcast.emit("disconnected", { message: 'The client disconnected' });

    });
});

io.on("connection", (client) => {
    console.log("Connected");

    client.on("connected", (data) => {
        client.broadcast.emit("connected", { message: 'The new client connected' });
    })

    client.on("newMessage", (data) => {
        console.log(data);

        client.broadcast.emit("newMessage", data);
        client.emit("newMessage", data);
    });

});


server.listen(8085);