
let nameBox = document.getElementById("noteName");
let addBtn = document.getElementById("addBtn");
let clearBtn = document.getElementById("clearBtn");

function fix() {
    if (window.localStorage.getItem("notes") == null) { window.localStorage.setItem("notes", "[]"); }
}

function addNote() {
    fix();

    let notes = JSON.parse(window.localStorage.getItem("notes"));

    if (nameBox.value == "") return false;
    if (notes.includes(nameBox.value)) return false;
    
    notes.push(nameBox.value);
    window.localStorage.setItem("notes", JSON.stringify(notes));
    
    nameBox.value = "";
    loadNotes()
}

function removeNote(titleOfNote) {
    let notes = JSON.parse(window.localStorage.getItem("notes"));
    notes = notes.filter(
        item => item != titleOfNote
    );
    window.localStorage.setItem("notes", JSON.stringify(notes))
}

function clearNotes() {
    fix();

    window.localStorage.clear();
    loadNotes();
}

function loadNotes() {
    fix();
    
    let notes = JSON.parse(window.localStorage.getItem("notes"));

    let existingNotes = document.getElementById("notes")
    if (existingNotes != null) {
        existingNotes.remove();
    }
    
    let notesContainer = document.createElement("div")
    notesContainer.id = "notes"

    notes.forEach(note => {
        let container = document.createElement("div");
        container.className = "note";

        let hr = document.createElement("hr");

        let noteTitle = document.createElement("h2");
        noteTitle.innerHTML = note;

        let doneBtn = document.createElement("button");
        doneBtn.onclick = () => { taskDone(doneBtn); }
        doneBtn.className = "btn doneBtn";
        doneBtn.innerHTML = "Done";

        container.appendChild(hr);
        container.appendChild(noteTitle);
        container.appendChild(doneBtn);

        notesContainer.appendChild(container);

    });
    document.body.appendChild(notesContainer);
}

function taskDone(doneBtn) {
    let noteName = doneBtn.parentElement.childNodes[1];
    
    removeNote(noteName.innerHTML);
    loadNotes();
}

addBtn.onclick = addNote;
clearBtn.onclick = clearNotes;
nameBox.addEventListener('keyup', ({key}) => {
    if (key != "Enter") return false;
    addNote();
})

loadNotes();