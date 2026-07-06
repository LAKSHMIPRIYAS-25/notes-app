const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");
const searchInput = document.getElementById("searchInput");

let notes = JSON.parse(localStorage.getItem("notes")) || [];

displayNotes();

addBtn.addEventListener("click", () => {

    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (title === "" || description === "") {
        alert("Please fill all fields.");
        return;
    }

    const note = {
        title: title,
        description: description
    };

    notes.push(note);

    saveNotes();

    displayNotes();

    titleInput.value = "";
    descriptionInput.value = "";

});

function displayNotes(filteredNotes = notes) {

    notesContainer.innerHTML = "";

    filteredNotes.forEach((note, index) => {

        notesContainer.innerHTML += `

        <div class="note-card">

            <h4>${note.title}</h4>

            <p>${note.description}</p>

            <div class="note-buttons">

                <button
                    class="btn btn-warning"
                    onclick="editNote(${index})">

                    Edit

                </button>

                <button
                    class="btn btn-danger"
                    onclick="deleteNote(${index})">

                    Delete

                </button>

            </div>

        </div>

        `;

    });

}

function deleteNote(index) {

    notes.splice(index, 1);

    saveNotes();

    displayNotes();

}

function editNote(index) {

    titleInput.value = notes[index].title;

    descriptionInput.value = notes[index].description;

    notes.splice(index, 1);

    saveNotes();

    displayNotes();

}

function saveNotes() {

    localStorage.setItem("notes", JSON.stringify(notes));

}

searchInput.addEventListener("keyup", () => {

    const searchText = searchInput.value.toLowerCase();

    const filteredNotes = notes.filter(note =>

        note.title.toLowerCase().includes(searchText) ||

        note.description.toLowerCase().includes(searchText)

    );

    displayNotes(filteredNotes);

});