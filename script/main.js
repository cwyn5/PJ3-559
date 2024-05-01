
import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import { Canvg } from 'https://cdn.jsdelivr.net/npm/canvg@4.0.2/+esm'
import * as csv from "./imports.js";

let div = document.getElementById("canvas");
let div_b = document.getElementById("canvas2");
let div2 = document.getElementById("div2");
let csvform = document.getElementById("fileupload");
let save1btn = document.getElementById("save1");
save1btn.onclick = function() {
  saveCanvas('#canvas', '#download', label1);
}

let save2btn = document.getElementById("save2");
save2btn.onclick = function() {
  saveCanvas('#canvas2', '#download', label2);
}
let file_contents = [[
  {
    "Red": 1,
    "Blue": 1,
    "Green": 7
  },
  {
    "Red": 2,
    "Blue": 1,
    "Green": 6
  },
  {
    "Red": 3,
    "Blue": 1,
    "Green": 5
  },
  {
    "Red": 4,
    "Blue": 1,
    "Green": 7
  },
  {
    "Red": 5,
    "Blue": 2,
    "Green": 6
  },
  {
    "Red": 6,
    "Blue": 2,
    "Green": 5
  },
  {
    "Red": 7,
    "Blue": 2,
    "Green": 7
  },
  {
    "Red": 8,
    "Blue": 2,
    "Green": 6
  },
  {
    "Red": 9,
    "Blue": 3,
    "Green": 5
  },
  {
    "Red": 0,
    "Blue": 3,
    "Green": 7
  },
  {
    "Red": 1,
    "Blue": 3,
    "Green": 6
  },
  {
    "Red": 2,
    "Blue": 3,
    "Green": 5
  },
  {
    "Red": 3,
    "Blue": 4,
    "Green": 7
  },
  {
    "Red": 4,
    "Blue": 4,
    "Green": 6
  },
  {
    "Red": 5,
    "Blue": 4,
    "Green": 5
  }
]];
csvform.onclick = () => readCSV();
let headers = [["Red", "Blue", "Green"]];
let x1 = "Red";
let y1 = "Red";
let w1 = 400;
let h1 = 400;
let label1 = "";
let color1 = "red";
let x2 = "Blue";
let y2 = "Green";
let w2 = 400;
let h2 = 400;
let label2 = "";
let color2 = "blue";
let bg_color = "white";
let dataset_1 = -1;
let dataset_2 = -1;
let set_dataset1 = document.getElementById('dataset1');
let set_dataset2 = document.getElementById('dataset2');
set_dataset1.onchange = function() {
  let val = set_dataset1.value;
  
  createDropdownHeaders(headers[val], sel_x1);
  x1 = sel_x1.value;
  createDropdownHeaders(headers[val], sel_y1);
  y1 = sel_y1.value;
  updateGraph1(file_contents[val]);
  
}

set_dataset2.onchange = function() {
  let val = set_dataset2.value;
  
  createDropdownHeaders(headers[val], sel_x2);
  x2 = sel_x2.value;
  createDropdownHeaders(headers[val], sel_y2);
  y2 = sel_y2.value;
  updateGraph2(file_contents[val]);
  
}
let sel_type1 = document.getElementById("chart_1");
let type1 = sel_type1.value;
let sel_x1 = document.getElementById("select_x1");
let sel_y1 = document.getElementById("select_y1");
let set_w1 = document.getElementById("w1");
let set_h1 = document.getElementById("h1");
let set_label1 = document.getElementById('label1')
let set_color1 = document.getElementById('color1');
set_color1.onchange = function() {
  color1 = set_color1.value;
  updateGraph1(file_contents[set_dataset1.value]);
}
createDropdownHeaders(headers[0], sel_x1);
createDropdownHeaders(headers[0], sel_y1);
updateGraph1(file_contents[0]);
sel_x1.onchange = function(){
    x1 = sel_x1.value;
    //console.log(x1);
    updateGraph1(file_contents[set_dataset1.value]);
};
sel_y1.onchange = function(){
    y1 = sel_y1.value;
    //console.log(y1);
    updateGraph1(file_contents[set_dataset1.value]);
};
sel_type1.onchange = function() {
    type1 = sel_type1.value;
    updateGraph1(file_contents[set_dataset1.value]);
};
set_w1.onchange = function() {
  w1 = set_w1.value;
  updateGraph1(file_contents[set_dataset1.value]);
}
set_h1.onchange = function() {
  h1 = set_h1.value;
  updateGraph1(file_contents[set_dataset1.value]);
}
set_label1.onchange = function() {
  label1 = set_label1.value;
  updateGraph1(file_contents[set_dataset1.value]);
}

let sel_type2 = document.getElementById("chart_2");
let type2 = sel_type1.value;
let sel_x2 = document.getElementById("select_x2");
let sel_y2 = document.getElementById("select_y2");

let set_w2 = document.getElementById("w2");
let set_h2 = document.getElementById("h2");
let set_label2 = document.getElementById('label2');
let set_color2 = document.getElementById('color2');
set_color2.onchange = function() {
  color2 = set_color2.value;
  updateGraph2(file_contents[set_dataset2.value]);
}
createDropdownHeaders(headers[0], sel_x2);
createDropdownHeaders(headers[0], sel_y2);

function updateGraph1(file_contents) {
  let line_color = 'black';
  if (color1 == 'white') {
    bg_color = 'black';
    line_color = 'white';
  }
  else {
    bg_color = 'white';
  }
  div.innerHTML = "";
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = w1 - margin.left - margin.right,
  height = h1 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#canvas")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)

.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
//Read the data
svg.append("rect")
    .attr("width", width + 2*margin.left + 2*margin.right)
    .attr("height", height + 2*margin.top + 2*margin.bottom)
    .attr("fill", bg_color)
    .attr("transform",
        "translate(" + -1*margin.left + "," + -1*margin.top + ")");

let x1min = Number.MAX_SAFE_INTEGER
for (let i = 0; i < file_contents.length; i++) {
    if (x1min > file_contents[i][x1]) {
      x1min = file_contents[i][x1];
    }
}

let x1max = Number.MIN_SAFE_INTEGER
for (let i = 0; i < file_contents.length; i++) {
    if (x1max < file_contents[i][x1]) {
      x1max = file_contents[i][x1];
    }
}

let y1min = Number.MAX_SAFE_INTEGER
for (let i = 0; i < file_contents.length; i++) {
    if (y1min > file_contents[i][y1]) {
      y1min = file_contents[i][y1];
    }
}

let y1max = Number.MIN_SAFE_INTEGER
for (let i = 0; i < file_contents.length; i++) {
    if (y1max < file_contents[i][y1]) {
      y1max = file_contents[i][y1];
    }
}

// Add X axis
var x = d3.scaleLinear()
  .domain([x1min, x1max])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("stroke", line_color)
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
  .domain([y1min, y1max])
  .range([ height, 0]);
svg.append("g")
  .attr("stroke", line_color)
  .call(d3.axisLeft(y));


    if (type1 == 3) { //density
      var densityData = d3.contourDensity()
      .x(function(d) { return x(d[x1]); })   // x and y = column name in .csv input data
      .y(function(d) { return y(d[y1]); })
      .size([width, height])
      .bandwidth(20)    // smaller = more precision in lines = more lines
      (file_contents)

      svg
      .selectAll("path")
      .data(densityData)
      .enter()
      .append("path")
        .attr("d", d3.geoPath())
        .attr("fill", "none")
        .attr("stroke", color1)
        .attr("stroke-linejoin", "round")
    }
    if (type1 == 2) { //scatterplot
      svg.append('g')
      .selectAll("dot")
      .data(file_contents)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d[x1]); } )
        .attr("cy", function (d) { return y(d[y1]); } )
        .attr("r", 3)
        .style("fill", color1)
    }
    if (type1 == 1) { //line chart
      svg.append("path")
      .datum(file_contents)
      .attr("fill", "none")
      .attr("stroke", color1)
      .attr("stroke-width", 3)
      .attr("d", d3.line()
        .x(function(d) { return x(d[x1]) })
        .y(function(d) { return y(d[y1]) })
        )
    }
    if (type1 == 0) { //area chart
      svg.append("path")
      .datum(file_contents)
      .attr("fill", color1)
      .attr("stroke", color1)
      .attr("stroke-width", 3)
      .attr("d", d3.area()
        .x(function(d) { return x(d[x1]) })
        .y0(y(0))
        .y1(function(d) { return y(d[y1]) })
        )
    }
    if (label1 != "") {
      svg.append("text")
      .attr("x", w1/2)
       .attr("y", margin.top)
       .attr("text-anchor", "middle")
       .attr("stroke", line_color)
       .style("font-size", "16px")
       .text(label1);
    }

    
 }

 sel_x2.onchange = function(){
  x2 = sel_x2.value;
  //console.log(x1);
  updateGraph2(file_contents[set_dataset2.value]);
};
sel_y2.onchange = function(){
  y2 = sel_y2.value;
  //console.log(y1);
  updateGraph2(file_contents[set_dataset2.value]);
};
sel_type2.onchange = function() {
  type2 = sel_type2.value;
  updateGraph2(file_contents[set_dataset2.value]);
};
set_w2.onchange = function() {
  w2 = set_w2.value;
  updateGraph2(file_contents[set_dataset2.value]);
}
set_h2.onchange = function() {
  h2 = set_h2.value;
  updateGraph2(file_contents[set_dataset2.value]);
}
set_label2.onchange = function() {
  label2 = set_label2.value;
  updateGraph2(file_contents[set_dataset2.value]);
}
updateGraph2(file_contents[0]);
 function updateGraph2(file_contents) {
  let line_color = 'black';
  if (color2 == 'white') {
    bg_color = 'black';
    line_color = 'white';
  }
  else {
    bg_color = 'white';
  }
  div_b.innerHTML = "";
  var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = w2 - margin.left - margin.right,
  height = h2 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#canvas2")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)

.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

svg.append("rect")
    .attr("width", width + 2*margin.left + 2*margin.right)
    .attr("height", height + 2*margin.top + 2*margin.bottom)
    .attr("fill", bg_color)
    .attr("transform",
        "translate(" + -1*margin.left + "," + -1*margin.top + ")");
//Read the data

let xmin = Number.MAX_SAFE_INTEGER
for (let i = 0; i < file_contents.length; i++) {
    if (xmin > file_contents[i][x2]) {
      xmin = file_contents[i][x2];
    }
}

let xmax = Number.MIN_SAFE_INTEGER
for (let i = 0; i < file_contents.length; i++) {
    if (xmax < file_contents[i][x2]) {
      xmax = file_contents[i][x2];
    }
}

let ymin = Number.MAX_SAFE_INTEGER
for (let i = 0; i < file_contents.length; i++) {
    if (ymin > file_contents[i][y2]) {
      ymin = file_contents[i][y2];
    }
}

let ymax = Number.MIN_SAFE_INTEGER
for (let i = 0; i < file_contents.length; i++) {
    if (ymax < file_contents[i][y2]) {
      ymax = file_contents[i][y2];
    }
}

// Add X axis
var x = d3.scaleLinear()
  .domain([xmin, xmax])
  .range([ 0, width ]);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("stroke", line_color)
  .call(d3.axisBottom(x));

// Add Y axis
var y = d3.scaleLinear()
  .domain([ymin, ymax])
  .range([ height, 0]);
svg.append("g")
  .attr("stroke", line_color)
  .call(d3.axisLeft(y));
    if (type2 == 3) { //density
      var densityData = d3.contourDensity()
      .x(function(d) { return x(d[x2]); })   // x and y = column name in .csv input data
      .y(function(d) { return y(d[y2]); })
      .size([width, height])
      .bandwidth(20)    // smaller = more precision in lines = more lines
      (file_contents)

      svg
      .selectAll("path")
      .data(densityData)
      .enter()
      .append("path")
        .attr("d", d3.geoPath())
        .attr("fill", "none")
        .attr("stroke", color2)
        .attr("stroke-linejoin", "round")
    }
    if (type2 == 2) { //scatterplot
      svg.append('g')
      .selectAll("dot")
      .data(file_contents)
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d[x2]); } )
        .attr("cy", function (d) { return y(d[y2]); } )
        .attr("r", 3)
        .style("fill", color2)
    }
    if (type2 == 1) { //line chart
      svg.append("path")
      .datum(file_contents)
      .attr("fill", "none")
      .attr("stroke", color2)
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d[x2]) })
        .y(function(d) { return y(d[y2]) })
        )
    }
    if (type2 == 0) { //area chart
      svg.append("path")
      .datum(file_contents)
      .attr("fill", color2)
      .attr("stroke", color2)
      .attr("stroke-width", 1.5)
      .attr("d", d3.area()
        .x(function(d) { return x(d[x2]) })
        .y0(y(0))
        .y1(function(d) { return y(d[y2]) })
        )
    }
    if (label2 != "") {
      svg.append("text")
      .attr("x", w2/2)
       .attr("y", margin.top)
       .attr("text-anchor", "middle")
       .style("font-size", "16px")
       .attr("stroke", line_color)
       .text(label2);
    }

    svg.append("box")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("color", bg_color);
 }

// https://www.sitelint.com/blog/convert-svg-to-png-or-jpg-or-webp-with-javascript
// https://stackoverflow.com/questions/3975499/convert-svg-to-image-jpeg-png-etc-in-the-browser
// https://stackoverflow.com/questions/10673122/how-to-save-canvas-as-an-image-with-canvas-todataurl
function saveCanvas(e, c, title) {
  let v = null;
    // Select the first svg element
    var svg = document.querySelector(e);
var data = (new XMLSerializer()).serializeToString(svg);
// We can just create a canvas element inline so you don't even need one on the DOM. Cool!
var canvas = document.querySelector(c);
const ctx = canvas.getContext('2d');
v = Canvg.fromString(ctx, svg.innerHTML);
v.start();
var dataURL = canvas.toDataURL("image/png", 1.0);
var a = document.createElement('a');
a.href = dataURL;
a.download = (title || 'canvas') + '.png';
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
}

async function readCSV() {
    let file = document.getElementById("file-input").files[0];
    let value = document.getElementById("file-input").value;
    Papa.parse(file, {
        complete: function(results) {
          updateDatasetList(document.getElementById('dataset1'), value, results.meta['fields'], results.data);
          updateDatasetList(document.getElementById('dataset2'), value, results.meta['fields'], results.data);
        },
        header: true
    }); 
}

/* 

            headers = results.meta['fields'];
            file_contents = results.data;
            createDropdownHeaders(headers, sel_x1);
            x1 = sel_x1.value;
            createDropdownHeaders(headers, sel_y1);
            y1 = sel_y1.value;
            updateGraph1();
*/
function createDropdownHeaders(a, select) {
    select.innerHTML = "";
    for(var i = 0; i < a.length; i++) {
        var opt = a[i];
        var el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        select.appendChild(el);
    }
}

function updateDatasetList(select, filename, h, contents) {
  let index = file_contents.length;
  
  file_contents.push(contents);
  //console.log(file_contents[1]);
  headers.push(h);
  console.log(headers);
  var el = document.createElement("option");
  el.textContent = filename;
  el.value = index;
  select.appendChild(el);
}


