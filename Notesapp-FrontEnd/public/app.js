document.addEventListener('DOMContentLoaded', () => {
    const noteInput = document.getElementById('noteInput');
    const saveNoteBtn = document.getElementById('saveNoteBtn');
    const listNotesBtn = document.getElementById('listNotesBtn');
    const noteList = document.getElementById('noteList');
  
    const apiUrl = 'http://localhost:3000/api/notes';
  
    // Save Note event handler
    saveNoteBtn.addEventListener('click', async () => {
      const content = noteInput.value.trim();
      if (!content) return alert('Please write your Note?');
  
      try {
        // Save the note in the database
        await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content })
        });
        noteInput.value = ''; // Clear the input after saving
        alert(' your Note saved successfully!'); // Notify the user that the note is saved
      } catch (error) {
        console.error('Error saving note:', error);
      }
    });
  
    // List Notes event handler
    listNotesBtn.addEventListener('click', listNotes);
  
    async function listNotes() {
      try {
        // Fetch the notes from the database
        const response = await fetch(apiUrl);
        const notes = await response.json();
        noteList.innerHTML = ''; // Clear the existing list
  
        // Append the notes to the UI
        notes.forEach(note => {
          const li = document.createElement('li');
          li.innerHTML = `
            ${note.content} <button onclick="deleteNote('${note._id}')">Delete</button>
          `;
          noteList.appendChild(li);
        });
      } catch (error) {
        console.error('Error listing notes:', error);
      }
    }
  
    // Delete Note function
    window.deleteNote = async (id) => {
      try {
        // Delete the note from the database
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        listNotes(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    };
  });
  fetch('http://localhost:3000/api/notes/api/endpoint')
  .then(response => response.json())
  .then(data => console.log(data));
