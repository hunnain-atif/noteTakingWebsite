//load existing notes
showNotes();

// add note to local stoarge when users creates new note
let addButton = document.getElementById('addButton');
addButton.addEventListener("click", function (e) {
    let addText = document.getElementById('addText');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesArray = [];
    } else {
        notesArray = JSON.parse(notes);
    }
    //adding note text to local stoarge
    notesArray.push(addText.value);
    localStorage.setItem("notes", JSON.stringify(notesArray))
    addText.value = "";
    //console.log(notesArray);
    showNotes();
})

// displays notes on site by reading local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesArray = [];
    } else {
        notesArray = JSON.parse(notes);
    }
    let html = "";
    notesArray.forEach(function (element, index) {
        //creating a new note card to be displayed
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note #${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>`
    });
    let notesElement = document.getElementById('notes')
    if (notesArray.length != 0) {
        notesElement.innerHTML = html
    } else {
        //default message for 0 case where there are no notes
        notesElement.innerHTML = `No notes yet! Get started by adding a new note above.`
    }
}

// delete note when delete button is pressed
function deleteNote(index){
    //console.log("deleting note")
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesArray = [];
    } else {
        notesArray = JSON.parse(notes);
    }
    notesArray.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesArray))
    showNotes();
}

//Search functionality that shows only notes that contain
//search query text
searchText = document.getElementById('searchText');
searchText.addEventListener("input", function(){
    //console.log('serach input recorded');
    let input = searchText.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard')
    Array.from(noteCards).forEach(function(element){
        let cardText = element.getElementsByTagName("p")[0].innerText;
        if(cardText.includes(input)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})