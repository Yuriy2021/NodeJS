#!/usr/bin/env node
const fs = require('fs');
const path = require("path");
const inquirer = require("inquirer");

const isFile = (fileName) => {
    return fs.lstatSync(fileName).isFile();
};

const list = fs.readdirSync(__dirname).filter(isFile);

inquirer
    .prompt([
        {
            name: "fileName",
            type: "list",
            message: "Choose file:",
            choices: list,
        },
    ])
    .then((answer) => {
        const filePath = path.join(__dirname, answer.fileName);
        const readStream = new fs.ReadStream(filePath, 'utf8');
        const writeStreamFirst = fs.createWriteStream('./%89.123.1.41%.log', {
            flags: "a",
            encoding: "utf-8",
        });



        const writeStreamSecond = fs.createWriteStream('./%34.48.240.111%.log', {
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
        const transformStreamSecond = new Transform({
            transform(chunk, encoding, callback) {

                const transformedChunk = chunk.toString().match(/^34.48.240.111 .*/gm).join('\n');

                callback(null, transformedChunk);

            }
        });


        readStream.pipe(transformStreamFirst).pipe(writeStreamFirst);
        readStream.pipe(transformStreamSecond).pipe(writeStreamSecond);
    });


