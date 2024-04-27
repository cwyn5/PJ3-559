

let div = document.getElementById("canvas");
let csvform = document.getElementById("fileupload");
csvform.onsubmit = function() {
    console.log("submitted");
}
div.innerHTML = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>' +
'<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>';