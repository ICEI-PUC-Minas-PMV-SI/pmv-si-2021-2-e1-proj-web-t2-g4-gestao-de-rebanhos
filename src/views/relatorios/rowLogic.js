// DOM CACHING
const compraField = document.getElementById("compraField");
const valor_compra_Field = document.getElementById("valor_compra_Field");
const data_compra_Field = document.getElementById("data_compra_Field");

function addRow(id) {
    let table = document.getElementById(id).insertRow();
   
    table.id = "newTr";

    const parent = document.getElementById("newTr");
    let child_nodes = parent.childNodes;
    console.log(child_nodes.length);
    parent.appendChild(document.createElement("th"));
    console.log(child_nodes.length);
    
    let cell1 = table.insertCell(1);
    let cell2 = table.insertCell(2);
    let cell3 = table.insertCell(3);
    let cell4 = table.insertCell(4);
    cell4.className = "td-default";
    console.log(child_nodes.length);
    table.removeAttribute('id');

}

function inputFields(alguma) {
    

}