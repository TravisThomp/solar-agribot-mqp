/**
 * This will store json data as a text file when needed
 */

const fs = require('fs')
const { resolve } = require('path')
const DIRECTORY = '../emergency-data-storage/'

let _currentStoredFiles = -1

module.exports = {
    saveJsonData: (filename, json) => {
        logger.info("Creating emergency data storage file.", { filename: filename, json: json})
        return new Promise((resolve, error) => {
            const filePath = DIRECTORY + filename + '.txt'
            
            fs.writeFile(filePath, JSON.stringify(json), 'utf8', (err) => {
                if(err) {
                    logger.error(err)
                    error(err)
                }

                
                _currentStoredFiles++
                resolve(true)
            })
        })
    },

    /**
     * Counts the number of stored emergency files
     * @returns Promise of number of stored files
     */
    countStoredFiles: () => {
        if(_currentStoredFiles != -1)
            return _currentStoredFiles
        
        const countStoredFilesPromise = new Promise((resolve, error) => {
            fs.readdir(DIRECTORY, (err, files) => {
                if(err) {
                    logger.error(err)
                    error(err)
                }

                resolve(files.length)
            })
        })

        _currentStoredFiles = countStoredFilesPromise
        return _currentStoredFiles
    },

    getFirstFileName: () => {
        const getFirstFileNamePromise = new Promise((resolve, error) => {
            if(module.exports.countStoredFiles() == 0)
                 resolve(undefined)
            
            fs.readdir(DIRECTORY, (err, files) => {
                if(err)
                    error(err)
                
                resolve(files[0])
            })
        })

        return getFirstFileNamePromise
    },

    /**
     * Reads the first file stored in the emergency storage folder
     * @returns The first file's name and data 
     */
    getFirstStoredData: () => {
        const getFirstStoredDataPromise = new Promise((resolve, error) => {
            
            module.exports.getFirstFileName().then((filename) => {
                fs.readFile(DIRECTORY + filename, 'utf8', (err, data) => {
                    if(err)
                        error(err)
                    
                    let jsonData = JSON.parse(data)
                    resolve({filename: filename, jsonData: jsonData})
                })
            })
            
            .catch((err) => error(err))
            
        })
        return getFirstStoredDataPromise
    },

    /**
     * Deletes a file from the emergency data storage
     * @param {name of file to delete} filename 
     * @returns Promise -> true if successful : error if unsuccessful
     */
    deleteFile: (filename) => {
        const deleteFilePromise = new Promise((resolve, error) => {
            fs.unlink(DIRECTORY + filename, (err) => {
                if(err)
                    error(err)
                
                resolve(true)
            })
        })
        return deleteFilePromise
    },
}