document.getElementById('note-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const titleInput = document.getElementById('title-input');
    const bodyInput = document.getElementById('body-input');
    const title = titleInput.value;
    const body = bodyInput.value;

    fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, body }),
    })
        .then(response => response.json())
        .then(() => {
            titleInput.value = '';
            bodyInput.value = '';
            loadNotes();
        });
});

function loadNotes() {
    fetch('/api/notes')
        .then(response => response.json())
        .then(notes => {
            const notesList = document.getElementById('notes-list');
            notesList.innerHTML = '';
            notes.forEach(note => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${note.title}</strong><p>${note.body}</p>`;
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', function () {
                    deleteNote(note.title);
                });
                li.appendChild(deleteButton);
                notesList.appendChild(li);
            });
        });
}

function deleteNote(title) {
    fetch(`/api/notes/${encodeURIComponent(title)}`, {
        method: 'DELETE',
    }).then(() => {
        loadNotes();
    });
}

// Load notes on page load
window.onload = loadNotes;
