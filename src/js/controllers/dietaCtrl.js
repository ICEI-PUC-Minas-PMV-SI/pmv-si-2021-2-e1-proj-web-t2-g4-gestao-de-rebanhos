import { db } from '../system_utilities/db.js';

window.addEventListener('load', redy);


function criarTabelaDietaseInsumos() {
    var query = "CREATE TABLE IF NOT EXISTS dietas ( id varchar,nome varchar)";
    var queryInsumos = "CREATE TABLE IF NOT EXISTS dietaInsumos (id INTEGER PRIMARY KEY, idDieta varchar , nomeInsumo varchar, qtdInsumos real, duracao integer)"
    db.transaction(function(tx) {
        tx.executeSql(query);
        tx.executeSql(queryInsumos);
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
    console.log("chamou save");
    var id = generateUUID();
    var nome = document.getElementById('nomedieta').value;
    var quantidade = document.getElementById('Quantidadeinsumos').value;
    var dados = [id,nome];
   // var ID = document.getElementById('ID').value;

    var validacao = true;
    var msgHtml = '';

    if (nome.length <= 0) {
        validacao = false;
        msgHtml += '<p> - O campo <b>nome</b> é obrigatório.</p>';
    }
    if (quantidade.length <= 0) {
        validacao = false;
        msgHtml += '<p> - O campo <b>quantidade</b> é obrigatório.</p>';
    }
    

    
    if(validacao == true){
    db.transaction(function(tx) {

        tx.executeSql('INSERT INTO dietas (id, nome) VALUES (?, ?)', dados,
            //callback sucesso
            function() {
                console.log("entrou na função");
                for (var i = 0; i < quantidade; i++) {
                    var nomeInsumo = document.getElementById('supplyname' + i).value;
                    var qtdInsumos = document.getElementById('quantity' + i).value;
                    var duracao = document.getElementById('duration' + i).value;
                    dados = [id,nomeInsumo,qtdInsumos,duracao];

                    if (nomeInsumo.length <= 0) {
                        validacao = false;
                        msgHtml += '<p> - O campo <b>nome Insumo</b> é obrigatório.</p>';
                    }
                    if (qtdInsumos.length <= 0) {
                        validacao = false;
                        msgHtml += '<p> - O campo <b>quantidade</b> é obrigatório.</p>';
                    }
                    if (duracao.length <= 0) {
                        validacao = false;
                        msgHtml += '<p> - O campo <b>duração</b> é obrigatório.</p>';
                    }
                    if (validacao == true){
                    tx.executeSql('INSERT INTO dietaInsumos (idDieta, nomeInsumo, qtdInsumos, duracao) VALUES (?,?,?,?)',dados,
                        //callback sucesso
                        function(tx,msg) {
                            //modal para informar o usuario
                            swal.fire({
                                 icon: "success",
                                title: "Dieta cadastrada com sucesso!",
                             });
                        },
                        function(tx,erro){console.log("valores não inseridos");console.log(erro);}
                    );
                    }
                    else {
                        swal.fire({
                            icon: "error",
                            title: "Preencha os campos corretamente.",
                            html: msgHtml
                        });
                    }
                    
                }
            }
        );


    });
}
else {
    swal.fire({
        icon: "error",
        title: "Preencha os campos corretamente.",
        html: msgHtml
    });
}
}

//selecionar das dietas
function getDietas(callback){
    db.transaction(function(tx){
        tx.executeSql('SELECT id,nome FROM dietas ORDER BY nome',[],
        function(tx,resultado){
            callback(resultado);
        },
        function(tx,erro){
            console.log("erro ao executar");
            console.log(erro);
        })
    });
}


function redy() {
    if (document.getElementById('btn-save')) {
        document.getElementById('btn-save').addEventListener('click', save);
    }
    //if (document.getElementById('btn-search')) document.getElementById('btn-search').addEventListener('click', search);
    criarTabelaDietaseInsumos();
    console.log("Chamou controller");

    
    
    getDietas(function(resultado){
        console.log("Chamou getdietas");
        $(resultado.rows).each(function(index,dados){
            //console.log(resultado.rows);
           // console.log(dados.nome);
            let option = document.createElement('option');
            option.value = dados.id;
            option.innerHTML = dados.nome;
    
            $('#listaDietas').append(option); //adicionar objeto ao select
        });
    });

}











