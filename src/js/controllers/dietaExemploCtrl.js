import { db } from '../system_utilities/db.js'; // permite acessar o banco de dados sqlite no próprio navegador

window.addEventListener('load', redy);


function criarTabelaInsumosTeste() {
    var query = "CREATE TABLE IF NOT EXISTS dietaTeste ( id TEXT PRIMARY KEY,nome TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });
}


function criarTabelaDieta() {
    var query = "CREATE TABLE IF NOT EXISTS dietaTeste ( id TEXT,nome TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });
}

function criarTabelaInsumosDieta() {
    var query = "CREATE TABLE IF NOT EXISTS insumosDieta ( id INTEGER PRIMARY KEY, idInsumo INTEGER, idDieta TEXT, nomeInsumo TEXT, qtdInsumos REAL, duracao INTEGER)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });
}

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) { //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else { //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function save() {
    //gera um id unico
    var id = generateUUID();
    var nome = document.getElementById('nome').value;
    var quantidade = document.getElementById('Quantidadeinsumos').value;

    db.transaction(function(tx) {

        tx.executeSql('INSERT INTO dietaTeste (id, nome) VALUES (?, ?)', [id, nome],
            //callback sucesso
            function() {
                for (var i = 1; i <= quantidade; i++) {
                    var nomeInsumo = document.getElementById('supplyname' + i).value;
                    var qtdInsumos = document.getElementById('quantity' + i).value;
                    var duracao = document.getElementById('duration' + i).value;
                    tx.executeSql('INSERT INTO insumosDieta (idDieta, nomeInsumo, qtdInsumos, duracao) VALUES (?,?,?,?)', [id, nomeInsumo, qtdInsumos, duracao],
                        //callback sucesso
                        function() {

                            swal.fire({
                                icon: "success",
                                title: "Dieta cadastrada com sucesso!",
                            });

                        }
                    );
                }
            }
        );


    });

    // document.getElementById('name').value = '';
    // document.getElementById('quantity').value = '';
    // document.getElementById('quantityMin').value = '';

}

function redy() {
    if (document.getElementById('btn-save')) {
        document.getElementById('btn-save').addEventListener('click', save);
    }
    //if (document.getElementById('btn-search')) document.getElementById('btn-search').addEventListener('click', search);
    criarTabelaInsumosTeste();
    criarTabelaDieta();
    criarTabelaInsumosDieta();

}