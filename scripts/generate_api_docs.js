const fs = require('fs');
const path = require('path');
const { exec } = require("child_process");

const jsFilesFoldPath = path.join(__dirname, '../dist');
const output = path.join(__dirname, '../docs');
const makeDocsCommand = (name, path) => `jsdoc2md -f ${path}/${name}.js > ${output}/${name}.api.md`;

const ignoredFiles = [
    'types',
    'generation',
    'util.js',
    'tag-names.js',
    'css-property-values.js',
    'css-properties.js',
    'css-property-values.js',
];

function processFolder(folderPath) {
    const inFiles = fs.readdirSync(folderPath);

    for (const file of inFiles) {
        // Skip map files
        if (file.includes('map')) continue;
        if (ignoredFiles.includes(file)) continue;

        const filePath = path.join(folderPath, file);
        const fstat = fs.statSync(filePath);

        if (fstat.isDirectory()) {
            processFolder(filePath);
        }
        else {
            const extension = path.extname(filePath);
            const name = path.basename(filePath, extension).replace(extension, '');

            const command = makeDocsCommand(name, folderPath);
            exec(command, (error, _, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
            });
        }
    }

}

fs.rmSync(output, {recursive: true});
fs.mkdirSync(output);

processFolder(jsFilesFoldPath);


