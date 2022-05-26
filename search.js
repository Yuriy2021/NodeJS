#!/usr/bin/env node
const fs = require('fs');
const path = require("path");
const inquirer = require("inquirer");
const inquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt');
inquirer.registerPrompt('file-tree-selection', inquirerFileTreeSelection);
inquirer
    .prompt([
        {
            name: "directory",
            type: "file-tree-selection",
            message: "Choose directory",

        },
        {
            name: "fir_search",
            type: "input",
            message:"Enter the regular expression for search first IP:",
        },
        
    ])

    .then((answer) => {
        const filePath = answer.directory;
        const readStream = new fs.ReadStream(filePath, 'utf8');
        const writeStreamFirst = fs.createWriteStream(`./%${answer.fir_search}.log`, {
            flags: "a",
            encoding: "utf-8",
        });

        const { Transform } = require('stream');
        const transformStreamFirst = new Transform({
            transform(chunk, encoding, callback) {
                const re = new RegExp(`^${answer.fir_search} .*`, 'gm')
                const transformedChunk = chunk.toString().match(re).join('\n');

                callback(null, transformedChunk);

            }
        });
        
        readStream.pipe(transformStreamFirst).pipe(writeStreamFirst);        
    });