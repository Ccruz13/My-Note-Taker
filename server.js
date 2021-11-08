const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const allnotes = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './db/db.json'));
});

app.get('/api/notes/:id', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(savedNotes[Number(req.params.id)]);
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.post('/api/notes', (req, res) => {
    let savedNotes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    let newNotes = req.body;
    let noteID = (savedNotes.length).toString();
    newNotes.id = noteID;
    savedNotes.push(newNotes);

    fs.writeFileSync('./db/db.json', JSON.stringify(savedNotes));
    console.log("Note saved to db.json.")
    res.json(savedNotes);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });