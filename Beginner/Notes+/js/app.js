/***
 *  Variables and Buttons
 **/

var noteId = 0;

/* The Storage - Persistence */
var storage = window.localStorage;

/* --- Notes Container --- */

let searchSection = document.querySelector(".search-section");

let searchNoteTextField = document.querySelector(".search-textbox");

let notes_header = document.querySelector(".notes-header");

let notesContainer = document.querySelector(".notes-container");

let deleteNoteButton = document.querySelector(".btn-delete-note-view");

/* ----- Note View Section ---- */
let noteView = document.querySelector(".note-view");

let saveNoteButton = document.querySelector(".btn-save-note-view");

let deleteButtonNoteView = document.querySelector(".btn-delete-note-view");

/* --- Behavior Part --- */

// Render the notes as soon as the app opens
renderNotes();

// Searches the note and renders the note if found
searchNoteTextField.addEventListener("keyup", () => {
  searchNotes();
});

// Opens the note view
document.querySelector(".js-new-note").addEventListener("click", () => {
  displayNoteView();
});

// Closes the note view
document.querySelector(".close-note").addEventListener("click", () => {
  closeNoteView();
});

// Handles the click event on the note
notesContainer.addEventListener("click", (event) => {
  // Opens the note when clicks the note box
  if (event.target.classList.contains("note")) {
    // Gets the id of the note
    this.noteId = event.target.dataset.key;

    // Searches for the notes in the persistence layer
    let note = getNoteById(this.noteId);

    // Updates the Note View before displaying it
    document.querySelector(".note-view-header-title").textContent =
      "Edit Note: " + note.title;
    document.querySelector(".title-note-view").value = note.title;
    document.querySelector(".text-note-view").value = note.text;

    // Displays the delete note button
    document.querySelector(".btn-delete-note-view").style.display = "block";

    //
    displayNoteView();
  }

  // Deletes the note without opening the display note
  if (event.target.classList.contains("js-delete-note")) {
    this.noteId = event.target.parentElement.dataset.key;
    deleteNote(this.noteId);
  }
});

// Deletes the note when clicked from the note view
deleteButtonNoteView.addEventListener("click", () => {
  deleteNote(this.noteId);
});

// Saves the note when the Save note button is clicked
saveNoteButton.addEventListener("click", () => {
  // The title of the note
  let title = document.querySelector(".title-note-view").value;

  // The text of the note
  let text = document.querySelector(".text-note-view").value;

  if (title && text) {
    saveNote(title, text);
  } else {
    alert("Error: The title/text is mandatory");
  }
});

function saveNote(title, text) {
  // Generates an id for the note
  let id = Math.floor(Math.random() * 100000 + 10000);

  // Checks whether the note already exists when the user tries to create a new note
  if (noteExists(title) && this.noteId === 0) {
    // Alerts the user that the note already exists
    alert("Error: The note title already exists!");

    // Checks whether the note already exists and updates it
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

    // Creates a new note if none of the conditions above are met
  } else {
    const note = {
      id,
      title,
      text,
    };

    // Stores the note
    storage.setItem(id, JSON.stringify(note));

    // Update the UI
    notesContainer.insertAdjacentHTML(
      "beforeend",
      `
    <div class="note" data-key='${note.id}'>
            <h3 class="note-title">${note.title}</h3>
            <button class="btn-delete-note js-delete-note">[X]</button>
          </div>
    `
    );

    if (storage !== 0) {
      notes_header.style.display = "block";
      searchSection.style.display = "block";
    }

    // Closes the view after inserting the new note
    closeNoteView();
  }
}

/**
 *
 * @param {number} id the id of the note to be deleted
 */
function deleteNote(id) {
  // Removes the
  storage.removeItem(noteId);
  let noteItem = document.querySelector(`[data-key='${noteId}']`);
  noteItem.remove();
  closeNoteView();

  if (storage.length === 0) {
    notesContainer.innerHTML = "";
    searchSection.style.display = "none";
    notes_header.style.display = "none";
  }
}

/**
 *
 * @param {text} noteTitle the title of the note to be checked
 */
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

// Displays the note view
function displayNoteView() {
  noteView.classList.add("show");
}

// Closes the note view and resets the all elements that were edited
function closeNoteView() {
  document.querySelector(".btn-delete-note-view").style.display = "none";
  clearFields();
  noteView.classList.remove("show");
}

// Render the notes when the app opens
function renderNotes() {
  if (storage.length === 0) {
    notes_header.style.display = "none";
  } else {
    notes_header.style.display = "block";
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
              <button class="btn-delete-note js-delete-note">[X]</button>
            </div>
      `
      );
    }
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

function searchNotes() {
  let flag = false;

  // Gets the text from the search note input and prints
  let input = searchNoteTextField.value.toUpperCase();

  // Gets all the notes from the notes container
  let notes = notesContainer.querySelectorAll(".note");

  // Loop throught all the
  for (let i = 0; i < notes.length; i++) {
    let note__title = notes[i].querySelector(".note-title").textContent;

    if (note__title.toUpperCase().indexOf(input) > -1) {
      notesContainer.insertAdjacentHTML("beforeend", notes[i].outerHTML);
    }
  }
}
