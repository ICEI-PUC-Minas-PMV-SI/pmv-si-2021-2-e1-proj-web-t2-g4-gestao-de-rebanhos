import { db } from '../system_utilities/db.js';

window.addEventListener('load', redy);


function criarTabelaDietaseInsumos() {
    var query = "CREATE TABLE IF NOT EXISTS dietas ( id integer primary key,idDieta varchar,nome varchar)";
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
    var ID = document.getElementById('ID').value;

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
        if(ID){ tx.executeSql('UPDATE dietas SET nome=? WHERE id=?', [nome,ID],
        //*callback sucesso
        function() {
            swal.fire({
                icon: "success",
                title: "dieta alterada com sucesso!",
            });
        },
        //*callback falha
        function() {
            swal.fire({
                icon: "error",
                title: "Falha em alterar a dieta.",
            });
        }
    );
    tx.executeSql('UPDATE dietaInsumos SET nomeInsumo=?, qtdInsumos=? WHERE id=?', [nomeInsumo,qtdInsumos,ID],
        //*callback sucesso
        function() {
            swal.fire({
                icon: "success",
                title: "Insumo alterado com sucesso!",
            });
        },
        //*callback falha
        function() {
            swal.fire({
                icon: "error",
                title: "Falha em alterar o insumo.",
            });
        }
    );

}else{
        tx.executeSql('INSERT INTO dietas (idDieta, nome) VALUES (?, ?)', dados,
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
    }


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
function search() {
    debugger
    var filterDieta=document.getElementById("nomeDieta").innerHTML;
    

    var tbody= document.getElementById("tbody-dietas");
    var total= document.getElementById("total");
    var table= document.getElementById("table-response");
    table.style.display="block";


    var sqlWhere = 'WHERE TRUE AND (';
    sqlWhere += (filterDieta !== null && filterDieta !== "") ? 'nomeDieta LIKE ' + "'%" + filterDieta + "%'" : 'TRUE';
    sqlWhere += ')';
    

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM dietas ' + sqlWhere, [], function(a, result) {
            var rows = result.rows;
            var tr = '';

            for (var i = 0; i < rows.length; i++) {


                var btns =
                    `<td class=" td-btn-options">
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown">
                                    <i class="fa fa-bars"></i>
                                </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" onclick="info('${rows[i].id}')" href="#"><i class="fa-info-circle fa"></i> <span style="padding-left: .3em;">Info</span></a>
                                <a class="dropdown-item" onclick="editar('${rows[i].id}')" href="#"><i class="fas fas fa-edit"></i> <span style="padding-left: .2em;">Editar</span> </a>
                                <a class="dropdown-item" onclick="baixa('${rows[i].id}')" href="#"><i class="fa-arrow-circle-down fa"></i> <span style="padding-left: .3em;">Baixa</span></a>
                            </div>
                        </div>
                    </td>`;

                tr += `<tr id="${rows[i].id}">`;
                tr += '<td>' + rows[i].nome + '</td>';
                tr += '</tr>';
            }
            tbody.innerHTML = tr;
            total.innerHTML = rows.length;


        },
        function (tx,erro){
            console.log("Erro ao fazer select");
            console.log(erro);
        });
    });
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
    if (document.getElementById('btn-search')) document.getElementById('btn-search').addEventListener('click', search);
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











