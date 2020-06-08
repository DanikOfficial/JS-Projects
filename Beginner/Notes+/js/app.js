/***
 *  Variables and Buttons
 **/

var noteId = 0;

/* The Storage - Persistence */
var storage = window.localStorage;

/* --- Notes Container --- */
let notesContainer = document.querySelector(".notes-container");

let deleteNoteButton = document.querySelector(".btn-delete-note-view");

/* ----- Note View Section ---- */

let noteView = document.querySelector(".note-view");

let saveNoteButton = document.querySelector(".btn-save-note-view");

let deleteButtonNoteView = document.querySelector(".btn-delete-note-view");

/* --- Behavior Part --- */

// Render the notes as soon as the app opens
renderNotes();

document.querySelector(".js-new-note").addEventListener("click", () => {
  displayNoteView();
});

document.querySelector(".close-note").addEventListener("click", () => {
  closeNoteView();
});

notesContainer.addEventListener("click", (event) => {
  if (event.target.classList.contains("note")) {
    this.noteId = event.target.dataset.key;
    let note = getNoteById(this.noteId);

    document.querySelector(".note-view-header-title").textContent =
      "Edit Note: " + note.title;
    document.querySelector(".title-note-view").value = note.title;
    document.querySelector(".text-note-view").value = note.text;
    document.querySelector(".btn-delete-note-view").style.display = "block";

    displayNoteView();
  }

  if (event.target.classList.contains("js-delete-note")) {
    this.noteId = event.target.parentElement.dataset.key;
    deleteNote(this.noteId);
  }
});

deleteButtonNoteView.addEventListener("click", () => {
  deleteNote(noteId);
});

saveNoteButton.addEventListener("click", () => {
  // The title of the note
  let title = document.querySelector(".title-note-view").value;

  // The text of the note
  let text = document.querySelector(".text-note-view").value;

  console.log("text:", text);

  if (title && text) {
    saveNote(title, text);
  } else {
    alert("Error: The title/text is mandatory");
  }
});

function saveNote(title, text) {
  let id = Math.floor(Math.random() * 100000 + 10000);

  if (noteExists(title) && this.noteId === 0) {
    alert("Erro: The note title already exists!");
  } else if (noteExists(title) && this.noteId !== 0) {
    // Get the selected Item
    let item = storage.getItem(noteId);

    // Parse the item to note object
    let note = JSON.parse(item);

    // Update the text
    note.text = text;

    // Remove the old item
    storage.removeItem(noteId);

    // Save the new item
    storage.setItem(noteId, JSON.stringify(note));
    closeNoteView();
  } else {
    const note = {
      id,
      title,
      text,
    };

    storage.setItem(id, JSON.stringify(note));

    notesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="note" data-key='${note.id}'>
            <h3 class="note-title">${note.title}</h3>
            <button class="btn-delete-note js-delete-note">[X]</button>
          </div>
    `
    );
    closeNoteView();
  }
}

function deleteNote(id) {
  storage.removeItem(noteId);
  let noteItem = document.querySelector(`[data-key='${noteId}']`);
  noteItem.remove();
  closeNoteView();
}

const noteExists = (noteTitle) => {
  let exists = false;
  for (let i = 0; i < storage.length; i++) {
    let item = storage.getItem(storage.key(i));

    let note = JSON.parse(item);

    if (note.title === noteTitle) {
      exists = true;
    }
  }
  return exists;
};

function displayNoteView() {
  noteView.classList.add("show");
}

function closeNoteView() {
  document.querySelector(".btn-delete-note-view").style.display = "none";
  clearFields();
  noteView.classList.remove("show");
}

function renderNotes() {
  for (let i = 0; i < storage.length; i++) {
    // Get note key
    let key = storage.key(i);

    // get note object
    let object = storage.getItem(key);

    // Parse to note object
    let note = JSON.parse(object);

    notesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="note" data-key='${note.id}'>
            <h3 class="note-title">${note.title}</h3>
            <button class="btn-delete-note js-delete-note"><ion-icon
              name="close-circle-outline"
            ></button>
          </div>
    `
    );
  }
}

let setNoteId = (id) => {
  noteId = id;
};

let getNoteId = () => {
  return noteId;
};

const getNoteById = (id) => {
  let note = JSON.parse(storage.getItem(id));
  return note;
};

function clearFields() {
  document.querySelector(".title-note-view").value = "";
  document.querySelector(".text-note-view").value = "";
  document.querySelector(".note-view-header-title").textContent =
    "Create a new note";

  this.noteId = 0;
}
