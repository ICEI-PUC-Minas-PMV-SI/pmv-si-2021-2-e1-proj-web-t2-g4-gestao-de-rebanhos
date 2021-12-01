//import { db } from '../system_utilities/db.js';
var db = openDatabase("dbGado", "1.0", "DB Gado De Ouro", 2 * 1024 * 1024);

window.addEventListener('load', redy);



function criarTabelaDietaseInsumos() {
    var query = "CREATE TABLE IF NOT EXISTS dietas (id varchar,nome varchar)";
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
    var newId = generateUUID();
    var nome = document.getElementById('nomedieta').value;
    var quantidade = document.getElementById('Quantidadeinsumos').value;
    var dados = [newId, nome];
    var id = document.getElementById('id').value;

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



    if (validacao == true) {
        db.transaction(function(tx) {
            if (id) {
                tx.executeSql('UPDATE dietas SET nome=? WHERE id=?', [nome, id],
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
               
            

            } else {
                tx.executeSql('INSERT INTO dietas (id, nome) VALUES (?, ?)', dados,
                    //callback sucesso
                    function() {
                        console.log("entrou na função");
                        for (var i = 0; i < quantidade; i++) {
                            var nomeInsumo = document.getElementById('supplyname' + i).value;
                            var qtdInsumos = document.getElementById('quantity' + i).value;
                            var duracao = document.getElementById('duration' + i).value;
                            dados = [newId, nomeInsumo, qtdInsumos, duracao];

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
                            if (validacao == true) {
                                tx.executeSql('INSERT INTO dietaInsumos (idDieta, nomeInsumo, qtdInsumos, duracao) VALUES (?,?,?,?)', dados,
                                    //callback sucesso
                                    function(tx, msg) {
                                        //modal para informar o usuario
                                        Swal.fire({
                                            title: 'Dieta Cadastrada com sucesso!',
                                            icon: "success",

                                        }).then((result) => {
                                            /* Read more about isConfirmed, isDenied below */
                                            if (result) {
                                                window.location.reload()
                                            }
                                        });
                                        

                                    },
                                    function(tx, erro) {
                                        console.log("valores não inseridos");
                                        console.log(erro);
                                    }
                                );
                            } else {
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

    } else {
        swal.fire({
            icon: "error",
            title: "Preencha os campos corretamente.",
            html: msgHtml
        });
    }
}



function Editar(id) {
    window.location.href = "../dieta/CadastroDieta1.html?" + id;
}

function popularDados() {
    //limpa a url
    var url = window.location.href.replace(/#/g, '');

    //verifica se a url possui um Id
    if (url.includes('?') && url.split('?')[1].length == 36) {
        var id = window.location.href.split('?')[1];
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM dietas WHERE id = ?", [id],
                function(_, result) {
                    var dieta = result.rows[0];

                    //adiciona o valor nos inputs advindos do bdd
                    document.getElementById('id').value = dieta.id;
                    document.getElementById('nomedieta').value = dieta.nome;
                    

                    //bloqueia o campo email pois ele não pode ser alterado
                    document.getElementById('Quantidadeinsumos').readOnly = true;
                    document.getElementById('botao').style.display="none";

                    tx.executeSql('SELECT * FROM dietaInsumos WHERE idDieta = ?',[id],
                        function(_,resultInsumos){
                            var tbody = document.getElementById('tbody-insumos');
                            var tr = '';
                            var table = document.getElementById('table-response');
                            table.style.display="block";

                            var insumos = resultInsumos.rows;

                            for(insumo of insumos){
                                tr += `<tr id="${insumo.id}"> `;
                                tr += `<td > ${insumo.nomeInsumo} </td>`;
                                tr += `<td > ${insumo.qtdInsumos} </td>`;
                                tr += `<td > ${insumo.duracao} </td>`;
                                tr += `</tr>`;

                            }
                            document.getElementById('Quantidadeinsumos').value=insumos.length;
                            tbody.innerHTML = tr;


                            //igual ao de cima 
                            // for(var i = 0;i < insumos.length;i++){
                            //     tr += `<tr id="${insumos[i].id}"> `; 
                            // }
                        }
                    );
                }
            );
        });

    }
}

function Deletar(id) {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter essa ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, vou deletar!',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            confirmarDelete(id);
        }
    })
}

function confirmarDelete(id) {


    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM dietaInsumos WHERE idDieta = ?", [id],
            //callback sucesso
            function() {
                tx.executeSql("DELETE FROM dietas WHERE id = ?", [id],
                    //callback sucesso
                    function() {
                        var tdExcluir = document.getElementById(id);
                        var total = document.getElementById('total').innerHTML;
                        document.getElementById('total').innerHTML = --total;

                        tdExcluir.style.display = 'none';
                        console.log('Confirmou delete. Id =  ' + id);
                        Swal.fire(
                            'Deletado!',
                            'Dieta deletada com sucesso!',
                            'success'
                        )
                    }
                );
            },
            //calback falha
            function() {
                swal.fire({
                    icon: "error",
                    title: "Falha em deletar o colaborador.",
                });
            }
        );
    });



}

function search() {
    //debugger
    var filterDieta = document.getElementById("nome").value;
    var tbody = document.getElementById("tbody-dietas");
    var total = document.getElementById("total");
    var table = document.getElementById("table-response");
    table.style.display = "block";


    var sqlWhere = 'WHERE TRUE AND (';
    sqlWhere += (filterDieta !== null && filterDieta !== "") ? 'D.nome LIKE ' + "'%" + filterDieta + "%'" : 'TRUE';
    sqlWhere += ')';

    //debugger
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM dietas D INNER JOIN dietaInsumos DI ON DI.idDieta = D.id ' + sqlWhere, [], function(a, result) {
                var rows = result.rows;
                var tr = '';

                //* Filtra as dietas para conter somente uma por idDieta
                const dietas = [];
                const map = new Map();
                for (const item of rows) {
                    if (!map.has(item.idDieta)) {
                        map.set(item.idDieta, true); // set any value to Map
                        dietas.push({
                            id: item.idDieta,
                            nome: item.nome,
                            insumosDieta: []
                        });
                    }
                }

                //* Adiciona o nome dos insumos na dieta
                for (const dieta of dietas) {
                    for (const item of rows) {
                        if (item.idDieta == dieta.id) {
                            dieta.insumosDieta.push(item.nomeInsumo);
                        }
                    }
                }
                for (const dieta of dietas) {
                    var btns =
                        `<td class=" td-default"><a href="#" onclick="Editar('${dieta.id}')" class="btn btn-primary btn-sm" title="Editar"><i class="fas fas fa-edit"></i></a>
                        <a href="#" onclick="Deletar('${dieta.id}')" class="btn btn-danger btn-sm btn-delete" title="Excluir"><i class="fas fa-trash"></i></a></td>
                        <td class=" td-btn-options">
                            <div class="btn-group">
                                <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown">
                                        <i class="fa fa-bars"></i>
                                    </button>
                                <div class="dropdown-menu">
                                    <a class="dropdown-item" onclick="Editar('${dieta.id}')" href="#"><i class="fas fas fa-edit"></i> <span style="padding-left: .2em;">Editar</span> </a>
                                    <a class="dropdown-item" onclick="Deletar('${dieta.id}')" href="#"><i class="fas fa-trash"></i> <span style="padding-left: .3em;">Excluir</span></a>
                                </div>
                            </div>
                        </td>`;

                    tr += `<tr id="${dieta.id}">`;
                    tr += '<td>' + dieta.nome + '</td>';
                    var nomeInsumo = '';
                    for (const insumo of dieta.insumosDieta) {
                        nomeInsumo += insumo + " - ";
                    }
                    nomeInsumo = nomeInsumo.substring(0, nomeInsumo.length - 2);
                    tr += '<td>' + nomeInsumo + '</td>';
                    tr += btns;
                    tr += '</tr>';
                }
                tbody.innerHTML = tr;
                total.innerHTML = dietas.length;




                // for (var i = 0; i < dietas.length; i++) {
                //     var btns =
                //         `<td class=" td-default"><a href="#" onclick="Editar('${dietas[i].id}')" class="btn btn-primary btn-sm" title="Editar"><i class="fas fas fa-edit"></i></a>
                //         <a href="#" onclick="Deletar('${dietas[i].id}')" class="btn btn-danger btn-sm btn-delete" title="Excluir"><i class="fas fa-trash"></i></a></td>
                //         <td class=" td-btn-options">
                //             <div class="btn-group">
                //                 <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown">
                //                         <i class="fa fa-bars"></i>
                //                     </button>
                //                 <div class="dropdown-menu">
                //                     <a class="dropdown-item" onclick="Editar('${dietas[i].id}')" href="#"><i class="fas fas fa-edit"></i> <span style="padding-left: .2em;">Editar</span> </a>
                //                     <a class="dropdown-item" onclick="Deletar('${dietas[i].id}')" href="#"><i class="fas fa-trash"></i> <span style="padding-left: .3em;">Excluir</span></a>
                //                 </div>
                //             </div>
                //         </td>`;

                //     tr += `<tr id="${dietas[i].id}">`;
                //     tr += '<td>' + dietas[i].nome + '</td>';
                //     tr += btns;
                //     tr += '</tr>';
                // }



            },
            function(tx, erro) {
                console.log("Erro ao fazer select");
                console.log(erro);
            });
    });
}


//selecionar das dietas select dietas na página cadastro animal
// function getDietas(callback){
//     db.transaction(function(tx){
//         tx.executeSql('SELECT id,nome FROM dietas ORDER BY nome',[],
//         function(tx,resultado){
//             callback(resultado);
//         },
//         function(tx,erro){
//             console.log("erro ao executar");
//             console.log(erro);
//         })
//     });
// }

function getInsumos(callback) {
    db.transaction(function(tx) {
        tx.executeSql('SELECT id,name FROM insumos ORDER BY name', [],
            function(tx, resultado) {
                callback(resultado);
            },
            function(tx, erro) {
                console.log("erro ao executar");
                console.log(erro);
            })
    });
}

// getInsumos(function(resultado){
//         debugger
//         console.log("Chamou getinsumos");
//         $(resultado.rows).each(function(index,dados){
//             //console.log(resultado.rows);
//            // console.log(dados.nome);
//             let option = document.createElement('option');
//             option.value = dados.id;
//             option.innerHTML = dados.name;


//             //$('#').append(option); //adicionar objeto ao select
//         });
//     });






function redy() {
    if (document.getElementById('btn-save')) {
        document.getElementById('btn-save').addEventListener('click', save);
        popularDados();
    }
    if (document.getElementById('btn-search')) document.getElementById('btn-search').addEventListener('click', search);
    criarTabelaDietaseInsumos();
    console.log("Chamou controller");



    // getDietas(function(resultado){
    //     debugger
    //     console.log("Chamou getdietas");
    //     $(resultado.rows).each(function(index,dados){
    //         //console.log(resultado.rows);
    //        // console.log(dados.nome);
    //         let option = document.createElement('option');
    //         option.value = dados.id;
    //         option.innerHTML = dados.nome;

    //         $('#listaDietas').append(option); //adicionar objeto ao select
    //     });
    // });

}