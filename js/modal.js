// Class Modal
var classModal = document.getElementById("classModal");
var classModalBtn = document.getElementById("classModalBtn");
var classClose = document.getElementById("classClose");

// Open Class Modal
classModalBtn.onclick = function() {
  classModal.style.display = "block";
  // requestClasses();
}

// Close Class Modal when x is clicked
classClose.onclick = function() {
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
    requestRaces();
}

// When the user clicks on <span> (x), close the modal
raceClose.onclick = function() {
    raceModal.style.display = "none";
    $("#raceModalContentInterior").html("");
    $("#raceModalContentInfo").html("");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == raceModal) {
        raceModal.style.display = "none";
        $("#raceModalContentInterior").html("");
        $("#raceModalContentInfo").html("");
    }
}
