const fs = require('fs')
const path = require('path')
const execFile = require('child_process').execFile

const srcFolder = path.resolve(__dirname, './src')
const distFolder = path.resolve(__dirname, './dist')
const isWindows = /^win/.test(process.platform)

// Copy everything what is no *.ts from source to dist

function isTypescriptFile(filename) {
    return filename.match(/^.*\.tsx?$/)
}

fs.readdir(srcFolder, (err, files) => {
    if (err) {
        console.log(err)
    }
    else {
        files.forEach((file) => {
            let sourceFile = srcFolder + '/' + file
            let distFile = distFolder + '/' + file
            fs.stat(sourceFile, (sErr, stats) => {
                if (sErr) {
                    console.log(sErr)
                }
                else {
                    if (!stats.isDirectory() && !isTypescriptFile(file)) {
                        fs.createReadStream(sourceFile).pipe(fs.createWriteStream(distFile))
                    }
                }
            })
        })
    }
})

// Run typescript
execFile(isWindows ? 'npm.cmd' : 'npm', ['run', 'ts'], (err, stdout, stderr) => {
    if (err) {
        console.log(err)
        return
    }
    console.log(stdout)
    console.log('err: ')
    console.log(stderr)

    // Run webpack
    execFile(isWindows ? 'npm.cmd' : 'npm', ['run', 'pack'], (err, stdout, stderr) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(stdout)
        console.log('stderr:')
        console.log(stderr)
    })
})