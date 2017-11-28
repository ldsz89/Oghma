// Class Modal
var classModal = document.getElementById("classModal");
var classModalBtn = document.getElementById("classModalBtn");
var classClose = document.getElementById("classClose");
var addClassBtn = document.getElementById("addClassBtn");

// Open Class Modal
classModalBtn.onclick = function() {
  classModal.style.display = "block";
  // requestClasses();
}

// Close Class Modal when x is clicked
classClose.onclick = function() {
  classModal.style.display = "none";
}

addClassBtn.onclick = function() {
  classModal.style.display = "none";
}

window.onclick = function(event) {
  if(event.target == classModal) {
    classModal.style.display = "none";
  }
}

// Race Modal
var raceModal = document.getElementById("raceModal");
var raceModalBtn = document.getElementById("raceModalBtn");
var raceClose = document.getElementById("raceClose");

// When the user clicks the button, open the modal
raceModalBtn.onclick = function() {
    raceModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
raceClose.onclick = function() {
    raceModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == raceModal) {
        raceModal.style.display = "none";
    }
}
