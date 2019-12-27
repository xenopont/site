(function (argv) {
  'use strict'

  var isFileReadable = function (fs, filename) {
    try {
      fs.accessSync(filename, fs.R_OK)
      return true
    }
    catch (err) {
      return false
    }
  }

  var included = []
  included.contains = function (str) {
    for (var i = 0, len = this.length; i < len; i++) {
      if (this[i] === str) {
        return true
      }
    }
    return false
  }

  var processFile = function (fs, input, rootDir) {
    if (!isFileReadable(fs, input)) {
      var err = 'Can not read "' + input + '"'
      console.log(err)
      throw err
    }
    var result = []
    var regexp = /^\/\/ include '([^']*)'\s*$/
    var lines = fs.readFileSync(input, 'utf8').split('\n')
    var filename = '';
    for (var i = 0, len = lines.length; i < len; i++) {
      if (lines[i].match(regexp)) {
        filename = path.resolve(rootDir + '/' + lines[i].replace(regexp, '$1'))
        if (included.contains(filename)) {
          // file already has been included
        }
        else {
          included.push(filename)
          try {
            result.push('// ' + filename)
            result = result.concat(processFile(fs, filename, rootDir))
          }
          catch (processingError) {
            console.log('Can not include "' + filename + '" in "' + input + '"')
            throw processingError
          }
        }

      }
      else {
        result.push(lines[i])
      }
    }
    return result;
  }

  // validate input file name
  if (!argv[2]) {
    console.log('Nothing to build. Provide a file name as an argument.')
    return
  }
  var fs = require('fs')
  var path = require('path')
  // validate input file access
  var inputFile = path.resolve(argv[2])
  try {
    fs.accessSync(inputFile, fs.R_OK)
  }
  catch (err) {
    console.log('Can not read the file "' + inputFile + '"')
    return
  }
  // validate output file access
  var outputFile = path.resolve(argv[3] ? argv[3] : './app.js')
  try {
    fs.accessSync(outputFile, fs.W_OK)
    console.log('The file "' + outputFile + '" already exists')
  }
  catch (err) {
    //
  }
  var rootDir = path.dirname(inputFile)
  try {
    var res = processFile(fs, inputFile, rootDir)
    fs.writeFileSync(outputFile, res.join('\n'))
    console.log('Done')
  }
  catch (err) {
    console.log('Build can not be done due to the reason: ' + err)
  }
}(process.argv))
