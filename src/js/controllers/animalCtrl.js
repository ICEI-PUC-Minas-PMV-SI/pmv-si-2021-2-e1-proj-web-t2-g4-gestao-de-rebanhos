//import { db } from '../system_utilities/db.js';
var db = openDatabase("dbGado", "1.0", "DB Gado De Ouro", 2 * 1024 * 1024);

window.addEventListener('load', ready);

// Cria a tabela de animais => animais
function createTableAnimals() {
    var query = "CREATE TABLE IF NOT EXISTS animais (id INTEGER PRIMARY KEY, tag TEXT NOT NULL, raca TEXT NOT NULL,idade INTEGER NOT NULL,sexo TEXT NOT NULL,peso REAL NOT NULL,nomeDieta TEXT,idDieta TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });
    console.log("criar tabela"); 
}
// Executar função
function save() {
    var id = document.getElementById('id').innerHTML;
    var tag= document.getElementById('tag').innerHTML;
    var idade = document.getElementById('idade').innerHTML;
    var peso= document.getElementById('peso').innerHTML;
    var raca= document.getElementById('raca').innerHTML;
    var sexo= document.getElementById('sexo').innerHTML;
    var nomeDieta= document.getElementById('nomeDieta').innerHTML;
    
    var validacao= true;
    var msgHtml= "";


    //Não deixar cadastrar em vazio
    if (tag.length<=0){
        validacao=false
        msgHtml += '<p> - O campo <b>tag</b> é obrigatório.</p>';
    }
    if (idade.length<=0){
        validacao=false
        msgHtml += '<p> - O campo <b>idade</b> é obrigatório.</p>';
    }
    if (peso.length<=0){
        validacao=false
        msgHtml += '<p> - O campo <b>peso</b> é obrigatório.</p>';
    }
    if (raca.length<=0){
        validacao=false
        msgHtml += '<p> - O campo <b>raca</b> é obrigatório.</p>';
    }
    if (sexo.length<=0){
        validacao=false
        msgHtml += '<p> - O campo <b>sexo</b> é obrigatório.</p>';
    }
    if (nomeDieta.length<=0){
        validacao=false
        msgHtml += '<p> - O campo <b>Nome dieta</b> é obrigatório.</p>';
    }


    if(validacao==true){
        db.transaction(function(tx) {
            if (id) {
                tx.executeSql('UPDATE animais SET idade=?, peso=? WHERE id=?', [idade, peso, id],
                //*callback sucesso
                function() {
                    swal.fire({
                        icon: "success",
                        title: "Animal alterado com sucesso!",
                    });
                },
                //*callback falha
                function() {
                    swal.fire({
                        icon: "error",
                        title: "Falha em alterar o animal.",
                    });
                }
            )
    
            } else {
                tx.executeSql('INSERT INTO animais (tag, raca, idade, sexo, peso, nomeDieta) VALUES (?, ?, ?, ?, ?, ?)', [tag, raca, idade, sexo, peso, nomeDieta],
                    // Callback sucesso
                    function() {
                        swal.fire({
                            icon: "success",
                            title: "Animal cadastrado com sucesso!",
                        });
                        document.getElementById('tag').innerHTML='';
                        document.getElementById('idade').innerHTML='';
                        document.getElementById('peso').innerHTML='';
                        document.getElementById('raca').innerHTML='';
                        document.getElementById('sexo').innerHTML='';
                        document.getElementById('nomeDieta').innerHTML='';
                    },
                    // Callback erro
                    function() {
                        swal.fire({
                            icon: "error",
                            title: "Falhou",
                        }); 
                    }
                );
            }
        });   
    }
    else{
        swal.fire({
            icon: "error",
            title: "Preencha os campos corretamente",
            html: msgHtml,
        });
    }
}

function search() {
    //debugger
    var filterTag=document.getElementById("tag").innerHTML;
    var filterRaca=document.getElementById("raca").innerHTML;
    var filterSexo=document.getElementById("sexo").innerHTML;

    var tbody= document.getElementById("tbody-animais");
    var total= document.getElementById("total");
    var table= document.getElementById("table-response");
    table.style.display="block";


    var sqlWhere = 'WHERE TRUE AND (';
    sqlWhere += (filterTag !== null && filterTag !== "") ? 'tag LIKE ' + "'%" + filterTag + "%'" : 'TRUE';
    sqlWhere += ' AND ';
    sqlWhere += (filterRaca !== null && filterRaca !== "") ? 'raca LIKE ' + "'%" + filterRaca + "%'" : 'TRUE';
    sqlWhere += ' AND ';
    sqlWhere += (filterSexo !== null && filterSexo !== "") ? 'sexo LIKE ' + "'%" + filterSexo + "%'" : 'TRUE';
    sqlWhere += ' AND ';
    sqlWhere += ' TRUE )';

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM animais ' + sqlWhere, [], function(a, result) {
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
                tr += '<td>' + rows[i].tag + '</td>';
                tr += '<td>' + rows[i].raca + '</td>';
                tr += '<td>' + rows[i].sexo + '</td>';
                tr += '<td>' + rows[i].idade + '</td>';
                tr += btns;
                tr += '</tr>';
            }
            tbody.innerHTML = tr;
            total.innerHTML = rows.length;


        });
    });
}

function info(id){
    window.location.href = "../animais/relatorio_animal.html?" + id;
}

function editar(id) {
    window.location.href = "../animais/cadastro_animal.html?" + id;
}

function baixa(id){
    console.log("chamou a funcao baixa e o id e: " + id);
}

function popularDados() {
    if (window.location.href.includes('?') && window.location.href.split('?')[1].length >= 1) {
        var id = window.location.href.split('?')[1];

        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM animais WHERE id = ?", [id],
                function(_, result) {
                    var animal = result.rows[0];

                    //adiciona o valor nos inputs advindos do bdd
                    document.getElementById('id').innerHTML = animal.id;
                    document.getElementById('tag').innerHTML = animal.tag;
                    document.getElementById('idade').innerHTML = animal.idade;
                    document.getElementById('peso').innerHTML = animal.peso;
                    document.getElementById('raca').innerHTML = animal.raca;
                    document.getElementById('sexo').innerHTML = animal.sexo;

                    //bloqueia os campos que não podem ser alterados
                    document.getElementById('tag').readOnly = true;
                    document.getElementById('raca').disabled = true;
                    document.getElementById('sexo').disabled = true;
                    document.getElementById('peso').readOnly = true;
                }
            );
        });

    }
}
function popularDadosRelatorio() {
    document.getElementById('btn-baixa').addEventListener('click', baixa);
    if (window.location.href.includes('?') && window.location.href.split('?')[1].length >= 1) {
        var id = window.location.href.split('?')[1];

        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM animais WHERE id = ?", [id],
                function(_, result) {
                    var animal = result.rows[0];

                    //adiciona o valor nos inputs advindos do bdd
                    document.getElementById('tag').innerHTML ="#0" + animal.tag;
                    document.getElementById('idade').innerHTML ="Idade: " + animal.idade;
                    document.getElementById('peso').innerHTML ="Peso: " + animal.peso;
                    document.getElementById('raca').innerHTML ="Raça: " + animal.raca;
                    document.getElementById('sexo').innerHTML ="Sexo: " + animal.sexo;
                }
            );
        });

    }
}
function ready() {
    createTableAnimals();
    if (document.getElementById('btn-save')) {
        document.getElementById('btn-save').addEventListener('click', save);
        popularDados();   
    }
    else if (document.getElementById("relatorio")){
        popularDadosRelatorio();
    }
}