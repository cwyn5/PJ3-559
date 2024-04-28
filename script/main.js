
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as csv from "./imports.js";

let div = document.getElementById("canvas");
let div2 = document.getElementById("div2");
let csvform = document.getElementById("fileupload");
let file_contents = [];
csvform.onclick = () => readCSV();
let headers = [];

async function readCSV() {
    let file = document.getElementById("file-input").files[0];
    Papa.parse(file, {
        complete: function(results) {
            headers = results.meta['fields'];
            file_contents = results.data;
        },
        header: true
    }); 
    div2.innerHTML = headers.toString();
    
}
div.innerHTML += '<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>' +
'<svg width="100" height="100"><circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" /></svg>';