const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;


const argv = require('yargs').argv;
const dir = argv.dir || desktopDirectory


// File paths for each category
filePaths = {
    Audio: argv.dir ? path.join(dir, 'Audio') : path.join(__dirname, 'Audio'),
    Video: argv.dir ? path.join(dir, 'Video') : path.join(__dirname, 'Video'),
    Text: argv.dir ? path.join(dir, 'Text') : path.join(__dirname, 'Text'),
    Image: argv.dir ? path.join(dir, 'Image') : path.join(__dirname, 'Image'),
    Compressed: argv.dir ? path.join(dir, 'Compressed') : path.join(__dirname, 'Compressed'),
    Office: argv.dir ? path.join(dir, 'Office') : path.join(__dirname, 'Office'),
    Programming: argv.dir ? path.join(dir, 'Programming') : path.join(__dirname, 'Programming'),
    Programs: argv.dir ? path.join(dir, 'Programs') : path.join(__dirname, 'Programs'),
    Other: argv.dir ? path.join(dir, 'Other') : path.join(__dirname, 'Other'),



}

// Assigning file extension to a category
fileTypes = {
    Audio: ['.mp3', '.wav', '.flac', '.ogg', '.wav', '.aiff', '.wma', '.aac', '.wave', '.mp4a'],
    Video: ['.mp4', '.mov', '.avi', '.flv', '.wmv', '.mkv', '.ogv', '.rm', '.m4p', '.mpg', '.mpmeg', '.mp2', '.svi', '.3gp'],
    Text: ['.txt', '.doc', '.docx', '.pdf', '.odt', '.wks', '.wpd', '.rtf'],
    Image: ['.png', '.jpg', '.jpeg', '.tif', '.svg', '.psd', '.gif', '.ai', '.raw', '.bmp'],
    Compressed: ['.zip', '.rar', '.tar', '7zip', '.7z', '.arj', '.pkg', '.rpm', '.tar.gz', '.z', '.deb'],
    Office: ['.ods', '.xlr', '.xls', '.xlsx', '.key', '.odp', '.pps', '.ppt', '.pptx'],
    Programming: ['.c', '.class', '.cpp', '.cs', '.h', '.java', '.sh', '.swift', '.vb', '.js'],
    Programs: ['.apk', '.bat', '.bin', '.com', '.exe', '.py', '.jar', '.wsf'],
    Other: []
}

// Don't move files with these extensions
fileTypeExceptions = ['.gitignore', '.json'];

let directoryFiles = [];


const createFolders = () => {
    // Create folders for each file type category
    Object.keys(filePaths).forEach(filePath => {
        if (!fs.existsSync(path.join(dir, filePath))) {
            fs.mkdirSync(path.join(dir, filePath));
        }
    })
}

const readDirectoryFiles = () => {
    let directoryItems = fs.readdirSync(dir);

    // Only care about files, not folders. Also filter out the main script.
    directoryFiles = directoryItems.filter(item => fs.lstatSync(path.join(dir, item)).isDirectory() == false && item !== 'organize.js');
}

const sortFiles = () => {
    directoryFiles.forEach(file => {

        const fileExtension = path.extname(file);

        // Move files only if it doesn't exist in exception file types array
        if (fileTypeExceptions.indexOf(fileExtension) == -1) {

            Object.values(fileTypes).forEach((fileType, index) => {

                // If the file belong to a file type category, move it to that category folder
                if (fileType.indexOf(fileExtension) > -1) {
                    moveFile(path.join(dir, file), path.join(path.join(dir, Object.keys(fileTypes)[index]), file));

                    // Remove the moved file from the directory files, needed to do this because of some error, that I describe below
                    directoryFiles = directoryFiles.filter(oldFile => oldFile !== file);
                }
            });

        }

    })

    // Got weird error that I couldn't figure out why when i put this 3 lines of code in the else block above
    // Couldn't "continue" to next file/iteration when a file is found and moved
    // so, after a file is moved to a folder, the program is trying to move the same file to another folder
    // obviously causing error because that file no longer exists in the old path
    // To see what I mean, move this three lines of code below to the "else" block above, in the fileTypes forEach loop
    directoryFiles.filter(file => fileTypeExceptions.indexOf(file) != -1).forEach(remainingFile => {
        moveFile(path.join(dir, remainingFile), path.join(path.join(dir, "Other"), remainingFile));
    })
}

// Move files 
const moveFile = (filePath, fileDestination) => {
    fs.renameSync(filePath, fileDestination);
}

const organize = () => {
    createFolders();
    readDirectoryFiles();
    sortFiles();
}

organize();

