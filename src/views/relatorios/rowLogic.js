// DOM CACHING
const buttonModalCompra = document.getElementById('modal-compra');

const tabelaCompra = document.getElementById('tabelaCompra');

let compraField = document.getElementById("compraField");
let valor_compra_Field = document.getElementById("valor_compra_Field");
let data_compra_Field = document.getElementById("data_compra_Field");


// REGEX
const dateCheck = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
const moneyCheck = /^R\$(\d{1,3}(\.\d{3})*|\d+)(\,\d{2})?$/g;



function addRow(tabela, input1, input2, input3) {
    let row = tabela.insertRow();
    row.id = "newTr";

    const parent = document.getElementById("newTr");
    parent.appendChild(document.createElement("th"));
    
    let cell1 = row.insertCell(1);
    let cell2 = row.insertCell(2);
    let cell3 = row.insertCell(3);
    let cell4 = row.insertCell(4);

    cell4.className = "td-default";
    cell4.id = "pai";
    const celulaPAI = document.getElementById("pai");

    
    cell1.id = 'compra';
    cell2.id = 'valor';
    cell3.id = 'data';

    cell1 = document.getElementById('compra');
    cell2 = document.getElementById('valor');
    cell3 = document.getElementById('data');

    cell1.textContent = input1;
    cell2.textContent = input2;
    cell3.textContent = input3;

    cell1.removeAttribute('id');
    cell2.removeAttribute('id');
    cell3.removeAttribute('id');
    row.removeAttribute('id');

    addButtons(celulaPAI);
}

function addButtons(id) {
    let novoHtml = '<a href="#" class="btn btn-primary btn-sm" title="Editar" ><i class="fas fas fa-edit"></i></a><a href="#" class="btn btn-danger btn-sm btn-delete" title="Excluir" ><i class="fas fa-trash"></i></a>';
    id.innerHTML = novoHtml;
    id.removeAttribute('id');
    
}

function validateInputs(input1, input2, input3) {
    if (input1.length < 1 || input2.length < 1) {
        alert('Todos os campos devem ser preenchidos!');
       return false;
    } else if (!input3.match(dateCheck)) {
        alert('O campo data não está no formato válido: DD/MM/AAAA');
        return false;
    } else if (!input2.match(moneyCheck)) {
        alert('O campo valor não está no formato válido: R$XXXX,XX ou R$XXX.XXX,XX');
        return false;
    } else return true;
}




function compra() {
    let validacao = validateInputs(compraField.value, valor_compra_Field.value, data_compra_Field.value);
    if (validacao) {
        addRow(tabelaCompra, compraField.value, valor_compra_Field.value, data_compra_Field.value);
        buttonModalCompra.setAttribute('data-dismiss','modal');
    }
}

function baixa() {
    
}

function perda() {
    
}

buttonModalCompra.addEventListener('click', function () {
    compra()});