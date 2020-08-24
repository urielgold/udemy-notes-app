const fs = require('fs');
const chalk = require('chalk');

const NOTES_FILE_NAME = 'notes.json';

const addNote = (title, body) => {
    const notes = loadNotes();
    const noteExist = notes.some(note => note.title === title);

    debugger

    if (!noteExist) {
        notes.push({title, body});
        saveNotes(notes);
        console.log(chalk.green.inverse('The note was added successfully'));
    } else {
        console.log(chalk.red.inverse('Error: Title already exist'));
    }
};

const removeNote = title => {
    const notes = loadNotes();
    const newNotes =  notes.filter(note => note.title !== title);

    if (newNotes.length !== notes.length) {
        console.log(chalk.green.inverse(`removing ${title} from notes`));
        saveNotes(newNotes);
    } else {
        console.log(chalk.red.inverse('Error: Title note exist'));
    }
};

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync(NOTES_FILE_NAME);
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    }
    catch (e) {
        return [];
    }
};

const saveNotes = notes => {
    const dataJson = JSON.stringify(notes);
    fs.writeFileSync(NOTES_FILE_NAME, dataJson);
};

const listNotes = () => {
   const notes = loadNotes();
   console.log(chalk.magenta.inverse('Your Notes:'));
   notes.forEach(note => console.log(note.title));
};

const readNote = title => {
    const notes = loadNotes();
    const note = notes.find(note => title === note.title);
    if (note) {
        console.log(chalk.inverse.magenta(`${title}:`));
        console.log(note.body);
    } else {
        console.log(chalk.inverse.red(`Title "${title}" does not exist'`));
    }
};

module.exports = {
    addNote,
    removeNote,
    listNotes,
    readNote
};