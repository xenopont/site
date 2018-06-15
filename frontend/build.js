const start = Date.now()
const fs = require('fs')
const path = require('path')
const execFile = require('child_process').execFile

const srcFolder = path.resolve(__dirname, './src')
const distFolder = path.resolve(__dirname, './dist')
const isWindows = /^win/.test(process.platform)

function isTypescriptFile(filename) {
    return filename.match(/^.*\.tsx?$/)
}

// Step 1. Copy everything that is not *.ts from source to dist
console.log('copying files...');
fs.readdir(srcFolder, (err, files) => {
    if (err) {
        console.log(err)
        return
    }
    files.forEach((file) => {
        let sourceFile = srcFolder + '/' + file
        let distFile = distFolder + '/' + file
        fs.stat(sourceFile, (sErr, stats) => {
            if (sErr) {
                console.log(sErr)
                return
            }
            if (!stats.isDirectory() && !isTypescriptFile(file)) {
                fs.createReadStream(sourceFile).pipe(fs.createWriteStream(distFile))
            }
        })
    })
    console.log('files copied.')
});

// Step 2. Run typescript
console.log('compiling typescript...')
execFile(isWindows ? 'npm.cmd' : 'npm', ['run', 'ts'], (err, stdout, stderr) => {
    if (err) {
        console.log('ts error occurred:')
        console.log(err)
        console.log(stdout)
        console.log(stderr)
        return
    }
    console.log(stdout)
    if (stderr) {
        console.log('typescript stderr:')
        console.log(stderr)
    }
    console.log('typescript compiled. ' + (Date.now() - start) + ' ms')

    // Step 3. Run webpack
    console.log('packing application')
    execFile(isWindows ? 'npm.cmd' : 'npm', ['run', 'pack'], (err, stdout, stderr) => {
        if (err) {
            console.log('webpack error occurred:')
            console.log(err)
            return
        }
        console.log(stdout)
        if (stderr) {
            console.log('webpack stderr:')
            console.log(stderr)
        }
        console.log('app ready. ' + (Date.now() - start) + ' ms')
    })
})
