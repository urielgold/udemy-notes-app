//const validator = require('validator');
const yargs = require('yargs');
const {addNote, listNotes, readNote, removeNote} = require('./utils.js');

yargs.version('1.1.0');

yargs.command({
    command: 'add',
    describe: 'Adding a note',
    builder: {
        title: {
            describe: 'Note Title',
            type: 'string',
            demandOption: true,
        },
        body: {
            describe: 'Note Content',
            type: 'string',
            demandOption: true,
        }
    },
    handler(argv) {
        addNote(argv.title, argv.body);
    },
});

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title: {
            describe: 'Note Title',
            type: 'string',
            demandOption: true,
        },
    },
    handler(argv) {
        removeNote(argv.title);
    },
});

yargs.command({
    command: 'list',
    describe: 'listing the notes',
    handler() {
        listNotes();
    },
});

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Get the body of the provided title',
            type: 'string',
            demandOption: true,
        }
    },
    handler(argv) {
        readNote(argv.title);
    },
});

yargs.parse();

