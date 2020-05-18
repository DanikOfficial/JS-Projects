let storage = window.localStorage;
let deleteButtonNoteView = document.querySelector(".btn-delete-opened-note");
let noteView = document.querySelector(".note-view");

// Shows the modal to create a new note
document.querySelector(".new-note").addEventListener("click", () => {
  deleteButtonNoteView.style.display = "none";
  noteView.style.display = "block";
});

document.querySelector(".close-note").addEventListener("click", () => {
  noteView.style.display = "none";
});
