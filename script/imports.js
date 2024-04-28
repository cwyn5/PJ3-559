var csvScript = document.createElement('script');
csvScript.setAttribute('src','https://unpkg.com/papaparse@latest/papaparse.min.js');
document.head.appendChild(csvScript);
var jQueryScript = document.createElement('script');
jQueryScript.setAttribute('src','https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js');
document.head.appendChild(jQueryScript);


export async function parseCSV(csv) {
    let headers = [];
    let file_contents = [];
    const response = await Papa.parse(csv, {
        complete: function(results) {
            headers = results.meta['fields'];
            file_contents = results.data;
        },
        header: true
    }); 
    return headers;
}