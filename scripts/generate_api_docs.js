const fs = require('fs');
const path = require('path');

const jsFilesFoldPath = './dist/';
const output = './docs/';
const makeDocsCommand = (name) => `jsdoc2md -f ${jsFilesFoldPath}/${name}.js > ${output}/${name}.api.md`;

function processFolder(folderPath) {
    const inFiles = fs.readdirSync(folderPath);

    for (const file of inFiles) {
        const fstat = fs.statSync(file);

        if (fstat.isDirectory) {
            processFolder(file);
        }
        else {
            const extension = path.extname(file);
            const name = path.basename(file, extension);

            makeDocsCommand(name);
        }
    }

}

processFolder(jsFilesFoldPath);


