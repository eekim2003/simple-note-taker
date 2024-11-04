const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' folder

let notes = []; // In-memory storage for notes

// Endpoint to get all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// Endpoint to add a new note
app.post('/api/notes', (req, res) => {
    const { title, body } = req.body;
    const newNote = { title, body };
    notes.push(newNote);
    res.status(201).json(newNote);
});

// Endpoint to delete a note
app.delete('/api/notes/:title', (req, res) => {
    const titleToDelete = req.params.title;
    notes = notes.filter(note => note.title !== titleToDelete);
    res.status(204).end();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
