const start = Date.now()
const fs = require('fs')
const path = require('path')
const execFile = require('child_process').execFile

const srcFolder = path.resolve(__dirname, './src')
const distFolder = path.resolve(__dirname, './dist')
const jsFolder = path.resolve(__dirname, './js-compiled')
const isWindows = /^win/.test(process.platform)

function isTypescriptFile(filename) {
    return filename.match(/^.*\.tsx?$/)
}

function cleanUpFolderSync(pathToFolder) {
    fs.readdirSync(pathToFolder).forEach((file) => {
        const fullPath = pathToFolder + '/' + file
        if (fs.statSync(fullPath).isDirectory()) {
            cleanUpFolderSync(fullPath)
            fs.rmdirSync(fullPath)
            return
        }
        fs.unlinkSync(fullPath)
    })
}

function createGitKeepSync(pathToFolder) {
    fs.writeFileSync(pathToFolder + '/' + '.gitkeep', '')
}

function copyFilesSync(source, destination) {
    const files = fs.readdirSync(source)
    if (files.length === 0) {
        return
    }
    files.forEach((file) => {
        // skip typescript files
        if (isTypescriptFile(file)) {
            return
        }
        const sourceFile = source + '/' + file
        // skip directories
        if (fs.statSync(sourceFile).isDirectory()) {
            return
        }
        const destFile = destination + '/' + file
        fs.copyFileSync(sourceFile, destFile)
    })
}

// Step 0. Clean up compiled js files and dist
console.log('Cleaning up...')
cleanUpFolderSync(distFolder)
createGitKeepSync(distFolder)
cleanUpFolderSync(jsFolder)
createGitKeepSync(jsFolder)

// Step 1. Copy everything that is not *.ts from source to dist
console.log('Copying files...');
copyFilesSync(srcFolder, distFolder) // doesn't copy sub-folders

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
