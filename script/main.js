

let div = document.getElementById("canvas");
let csvform = document.getElementById("fileupload");
var fileContents = [];
csvform.onsubmit = function() {
    var file = document.getElementById('f');
    fileContents = $.csv.toArrays(file);
    console.log(fileContents);
}
div.innerHTML = '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>' +
'<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>';