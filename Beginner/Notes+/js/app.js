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
searchNoteTextField.addEventListener("keyup", (event) => {
  searchNotes(event);
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
    document.querySelector(".btn-save-note-view").innerHTML =
      "Update <ion-icon class='icon' name='save-outline'></ion-icon>";

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

  // checks if the fields are empty
  if (validFields(title, text)) {
    // checks if the note has changed, true IF changed, false IF NOT changed
    if (this.noteId !== 0) {
      updateNote(this.noteId, title, text);
    } else {
      saveNote(title, text);
    }
  } else {
    alert("Error: Title/Text note is mandatory");
  }
});

function saveNote(title, text) {
  // Generates an id for the note
  let id = Math.floor(Math.random() * 100000 + 10000);

  if (noteExists(title)) {
    // Alerts the user that the note already exists
    alert("Error: The note title already exists!");
  } else {
    const note = {
      id,
      title,
      text,
    };

    // Stores the note
    storage.setItem(id, JSON.stringify(note));

    // Update the UI
    insertNoteElement(note);

    if (storage !== 0) {
      notes_header.style.display = "block";
      searchSection.style.display = "block";
    }

    // Closes the view after inserting the new note
    closeNoteView();
  }
}

function updateNote(id, title, text) {
  // Get the note to be updated
  let item = storage.getItem(id);

  // Parse the item to a note object
  let note = JSON.parse(item);

  // Remove the old note
  storage.removeItem(id);

  // Update the fields
  note.id = id;
  note.title = title;
  note.text = text;

  // Save the updated note
  storage.setItem(noteId, JSON.stringify(note));

  /**
   * Update UI
   *  */

  // Get the note element in the UI
  let noteElement = document.querySelector(`[data-key='${id}']`);

  // Update the name
  noteElement.querySelector(".note-title").textContent = note.title;

  closeNoteView();
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

  // Only loop through notes if one exists
  if (storage.length !== 0) {
    for (let i = 0; i < storage.length; i++) {
      let item = storage.getItem(storage.key(i));

      let note = JSON.parse(item);

      if (note.title.toUpperCase() === noteTitle.toUpperCase()) {
        exists = true;
      }
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
    searchSection.style.display = "none";
  } else {
    notes_header.style.display = "block";
    searchSection.style.display = "block";
    for (let i = 0; i < storage.length; i++) {
      // Get note key
      let key = storage.key(i);

      // get note object
      let object = storage.getItem(key);

      // Parse to note object
      let note = JSON.parse(object);

      insertNoteElement(note);
    }
  }
}

const getNoteById = (id) => {
  let note = JSON.parse(storage.getItem(id));
  return note;
};

function clearFields() {
  document.querySelector(".title-note-view").value = "";
  document.querySelector(".text-note-view").value = "";
  document.querySelector(".note-view-header-title").textContent =
    "Create a new note";
  document.querySelector(".btn-save-note-view").innerHTML =
    "Save <ion-icon class='icon' name='save-outline'></ion-icon>";
  this.noteId = 0;
}

const validFields = (title, text) => {
  let result = false;

  if (title && text) result = true;

  return result;
};

function searchNotes(event) {
  // Gets the text from the search note input and prints
  let input = searchNoteTextField.value.toUpperCase();

  notesContainer.innerHTML = "";

  // Loop throught all the
  for (let i = 0; i < storage.length; i++) {
    // get the key
    let key = storage.key(i);

    // get the item
    let item = storage.getItem(key);

    // transform the item into note object
    let note = JSON.parse(item);

    // checks if the typed word exists
    if (note.title.toUpperCase().indexOf(input) > -1) {
      insertNoteElement(note);
    }
  }

  // Gets all the searched notes
  let notesList = notesContainer.querySelectorAll(".note");

  // Checks if there are any note found
  if (notesList.length === 0) {
    notesContainer.innerHTML =
      "<div class='not-found'><ion-icon class='not-found__icon'" +
      " name='sad-outline'></ion-icon><p class='not-found__text'>" +
      "There are no notes with this title...</p></div>";

    notes_header.style.display = "none";
  } else {
    notes_header.style.display = "block";
  }
}

// Inserts a new note to the UI
function insertNoteElement(note) {
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
