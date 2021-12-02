//import { db } from '../system_utilities/db.js';
var db = openDatabase("dbGado", "1.0", "DB Gado De Ouro", 2 * 1024 * 1024);

window.addEventListener('load', ready);

// Cria a tabela de animais => animais
function createTableAnimals() {
    var query = "CREATE TABLE IF NOT EXISTS animais (id INTEGER PRIMARY KEY, tag TEXT NOT NULL, raca TEXT NOT NULL,idade INTEGER NOT NULL,sexo TEXT NOT NULL,peso REAL NOT NULL,idDieta TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });

}

// Cria a tabela de baixa animal
function criarTabelaBaixaAnimal() {
    var query = "CREATE TABLE IF NOT EXISTS baixaanimal (id INTEGER PRIMARY KEY, tag TEXT NOT NULL, raca TEXT NOT NULL,idade INTEGER NOT NULL, peso REAL NOT NULL, motivo TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });

}

function criarTabelaPesagemAnimal() {
    var query = "CREATE TABLE IF NOT EXISTS pesagemanimal (id INTEGER PRIMARY KEY, idAnimal INTEGER, tag TEXT NOT NULL, peso REAL NOT NULL, dtPesagem TEXT )";
    db.transaction(function(tx) {
        tx.executeSql(query, [], function() {},
            function(msg, e) {
                console.log(e);
            }
        );
    });

}

// Executar função
function save() {
    var id = document.getElementById('id').value;
    var tag = document.getElementById('tag').value;
    var idade = document.getElementById('idade').value;
    var peso = document.getElementById('peso').value;
    var raca = document.getElementById('raca').value;
    var sexo = document.getElementById('sexo').value;
    var nomeDieta = document.getElementById('nomeDieta').value;


    var validacao = true;
    var msgHtml = "";


    //Não deixar cadastrar em vazio
    if (tag.length <= 0) {
        validacao = false
        msgHtml += '<p> - O campo <b>tag</b> é obrigatório.</p>';
    }
    if (idade.length <= 0) {
        validacao = false
        msgHtml += '<p> - O campo <b>idade</b> é obrigatório.</p>';
    }
    if (peso.length <= 0) {
        validacao = false
        msgHtml += '<p> - O campo <b>peso</b> é obrigatório.</p>';
    }
    if (raca.length <= 0) {
        validacao = false
        msgHtml += '<p> - O campo <b>raca</b> é obrigatório.</p>';
    }
    if (sexo.length <= 0) {
        validacao = false
        msgHtml += '<p> - O campo <b>sexo</b> é obrigatório.</p>';
    }
    if (nomeDieta.length <= 0) {
        validacao = false
        msgHtml += '<p> - O campo <b>Nome dieta</b> é obrigatório.</p>';
    }


    if (validacao == true) {
        db.transaction(function(tx) {
            if (id) {
                tx.executeSql('UPDATE animais SET idade=?, idDieta=? WHERE id=?', [idade, nomeDieta, id],
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
                tx.executeSql('INSERT INTO animais (tag, raca, idade, sexo, peso, idDieta) VALUES (?, ?, ?, ?, ?, ?)', [tag, raca, idade, sexo, peso, nomeDieta],
                    // Callback sucesso
                    function() {
                        swal.fire({
                            icon: "success",
                            title: "Animal cadastrado com sucesso!",
                        });
                        document.getElementById('tag').value = '';
                        document.getElementById('idade').value = '';
                        document.getElementById('peso').value = '';
                        document.getElementById('raca').value = '';
                        document.getElementById('sexo').value = '';
                        document.getElementById('nomeDieta').value = '';
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
    } else {
        swal.fire({
            icon: "error",
            title: "Preencha os campos corretamente",
            html: msgHtml,
        });
    }
}

function search() {

    var filterTag = document.getElementById("tag").value;
    var filterRaca = document.getElementById("raca").value;
    var filterSexo = document.getElementById("sexo").value;

    var tbody = document.getElementById("tbody-animais");
    var total = document.getElementById("total");
    var table = document.getElementById("table-response");
    table.style.display = "block";


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
                                <a class="dropdown-item" onclick="pesagem('${rows[i].id}', '${rows[i].tag}')" href="#"><i class="fa fa-balance-scale"></i> <span style="padding-left: .2em;">Pesar</span> </a>
                                <a class="dropdown-item" onclick="baixa('${rows[i].id}', '${rows[i].tag}', '${rows[i].peso}', '${rows[i].idade}', '${rows[i].raca}', 'busca')" href="#"><i class="fa-arrow-circle-down fa"></i> <span style="padding-left: .3em;">Baixa</span></a>
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

function info(id) {
    window.location.href = "../animais/relatorio_animal.html?" + id;
}

function editar(id) {
    window.location.href = "../animais/cadastro_animal.html?" + id;
}

function baixa(id, tag, peso, idade, raca, page) {
    debugger
        (async() => {

            const { value: motivo } = await Swal.fire({
                title: 'Selecione o motivo da baixa!',
                input: 'select',
                inputOptions: {
                    'Baixa': {
                        acidente: 'Acidente',
                        venda: 'Venda',
                        abate: 'Abate',
                        outros: 'Outros'
                    }
                },
                inputPlaceholder: 'Selecione o motivo',
                confirmButtonText: 'Confirmar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value.length > 0) {
                            resolve()
                        } else {
                            resolve('Você precisa selecionar uma opção')
                        }
                    })
                }
            })

            if (motivo) {
                db.transaction(function(tx) {
                    tx.executeSql('INSERT INTO baixaanimal (tag, raca, idade, peso, motivo ) VALUES (?, ?, ?, ?, ?)', [tag, raca, idade, peso, motivo],
                        //Callback sucesso
                        function() {
                            tx.executeSql('DELETE FROM animais WHERE id = ?', [id],
                                //Callback sucesso
                                function() {

                                    if (page == 'relatorio') {
                                        //TODO JOGAR PARA A PAGINA DE BUSCA BAIXAS
                                        window.location.href = "../animais/cadastro_animal.html";
                                    } else {
                                        document.getElementById(id).style.display = 'none';
                                    }

                                    swal.fire({
                                        icon: "success",
                                        title: "Baixa efetuada com sucesso!",
                                    });
                                },
                            );
                        },
                        //Callback falha
                        function(msg, e) {
                            console.log(msg);
                            console.log(e);

                            swal.fire({
                                icon: "error",
                                title: "Erro em dar baixa"
                            });
                        }
                    );
                });


            }

        })()
}

function buscarBaixas() {

    var filterTag = document.getElementById("tag").value;
    var filterRaca = document.getElementById("raca").value;
    var filterMotivo = document.getElementById("motivo").value;

    var tbody = document.getElementById("tbody-animais");
    var total = document.getElementById("total");
    var table = document.getElementById("table-response");
    table.style.display = "block";


    var sqlWhere = 'WHERE TRUE AND (';
    sqlWhere += (filterTag !== null && filterTag !== "") ? 'tag LIKE ' + "'%" + filterTag + "%'" : 'TRUE';
    sqlWhere += ' AND ';
    sqlWhere += (filterRaca !== null && filterRaca !== "") ? 'raca LIKE ' + "'%" + filterRaca + "%'" : 'TRUE';
    sqlWhere += ' AND ';
    sqlWhere += (filterMotivo !== null && filterMotivo !== "") ? 'motivo LIKE ' + "'%" + filterMotivo + "%'" : 'TRUE';
    sqlWhere += ' AND ';
    sqlWhere += ' TRUE )';

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM baixaanimal ' + sqlWhere, [], function(a, result) {
            var rows = result.rows;
            var tr = '';

            for (var i = 0; i < rows.length; i++) {

                tr += `<tr id="${rows[i].id}">`;
                tr += '<td>' + rows[i].tag + '</td>';
                tr += '<td>' + rows[i].raca + '</td>';
                tr += '<td>' + rows[i].idade + '</td>';
                tr += '<td>' + rows[i].peso + '</td>';
                tr += '<td>' + rows[i].motivo + '</td>';
                tr += '</tr>';
            }
            tbody.innerHTML = tr;
            total.innerHTML = rows.length;


        });
    });
}

function popularDados() {
    var url = window.location.href.replace(/#/g, '');
    if (url.includes('?') && url.split('?')[1].length >= 1) {
        var id = window.location.href.split('?')[1];

        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM animais WHERE id = ?", [id],
                function(_, result) {
                    var animal = result.rows[0];

                    //adiciona o valor nos inputs advindos do bdd
                    document.getElementById('id').value = animal.id;
                    document.getElementById('tag').value = animal.tag;
                    document.getElementById('idade').value = animal.idade;
                    document.getElementById('peso').value = animal.peso;
                    document.getElementById('raca').value = animal.raca;
                    document.getElementById('sexo').value = animal.sexo;
                    document.getElementById('nomeDieta').value = animal.idDieta;

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
    var url = window.location.href.replace(/#/g, '');
    if (url.includes('?') && url.split('?')[1].length >= 1) {
        var id = window.location.href.split('?')[1];

        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM animais WHERE id = ?", [id],
                function(_, result) {
                    var animal = result.rows[0];

                    //adiciona o valor advindos do bdd
                    document.getElementById('tag').innerHTML = "#" + animal.tag;
                    document.getElementById('idade').innerHTML = "Idade: " + animal.idade + " Meses";
                    document.getElementById('peso').innerHTML = "Peso: " + animal.peso + " Kg";
                    document.getElementById('raca').innerHTML = "Raça: " + animal.raca;
                    document.getElementById('sexo').innerHTML = "Sexo: " + animal.sexo;


                    //document.getElementById('btn-baixa').innerHTML = `<button onclick="baixa('${animal.id}', '${animal.tag}', '${animal.peso}', '${animal.idade}', '${animal.raca}', 'relatorio')" type="button" 
                    //                                                  class="btn btn-outline-primary btn-lg ml-2" id="btn-baixa">Baixa Animais</button>`;
                    //                                                <button type="button" class="btn btn-outline-primary float-right" id="edit-rel"><i class="fas fas fa-edit"></i></button>



                    document.getElementById('edit-rel').innerHTML= `<button type="button" class="btn btn-outline-primary float-right" onclick="editar('${animal.id}')"><i class="fas fas fa-edit"></i></button>`;
                    //document.getElementById('dar-baixa').innerHTML= `<button type="button" class="btn btn-outline-primary float-right" onclick="editar('${animal.id}')"><i class="fas fas fa-edit"></i></button>`;

                    gerarGrafico(id);
                }
            );
        });

    }
}

function pesagem(idAnimal, tag) {
    (async() => {

        const { value: formValues } = await Swal.fire({
            title: 'Pesagem',
            html: `<div class="container-fluid">
            <p style="font-weight: bold;">Os dados com (*) são obrigatórios</p>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="float-left">Novo Peso*</label>
                        <input id="novoPeso" class="form-control text-uppercase" type="number" maxlength="10" />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label class="float-left">Data Pesagem*</label>
                        <input id="dataPesage" class="form-control text-uppercase" type="date" />
                    </div>
                </div>
            </div>
        </div>`,
            focusConfirm: false,
            confirmButtonText: 'Confirmar',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                return [
                    document.getElementById('novoPeso').value,
                    document.getElementById('dataPesage').value
                ]
            }
        })
        if (formValues[0].length >= 1 && formValues[1].length >= 1) {

            var peso = formValues[0];
            var dtPesagem = formValues[1];
            //pesagemanimal (id INTEGER PRIMARY KEY, idAnimal INTEGER, tag TEXT NOT NULL, peso REAL NOT NULL, dtPesagem TEXT
            db.transaction(function(tx) {
                tx.executeSql('INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (?, ?, ?, ?)', [idAnimal, tag, peso, dtPesagem],
                    //Callback sucesso
                    function() {
                        tx.executeSql('UPDATE animais SET peso=? WHERE id=?', [peso, idAnimal],
                            //*callback sucesso
                            function() {
                                swal.fire({
                                    icon: "success",
                                    title: "Animal alterado com sucesso!",
                                });
                            }
                        )
                    },
                    //Callback falha
                    function() {
                        swal.fire({
                            icon: "error",
                            title: "Falha em alterar o peso!",
                        });
                    }
                );
            });
        } else {
            swal.fire({
                icon: "error",
                title: "Preencha os dados obrigatórios!",
            });
        }

    })()
}

//selecionar das dietas select dietas na página cadastro animal
function getDietas(callback) {
    db.transaction(function(tx) {
        tx.executeSql('SELECT id,nome FROM dietas ORDER BY nome', [],
            function(tx, resultado) {
                callback(resultado);
            },
            function(tx, erro) {
                console.log("erro ao executar");
                console.log(erro);
            })
    });
}

function gerarGrafico(idAnimal) {
    //pesagemanimal (id INTEGER PRIMARY KEY, idAnimal INTEGER, tag TEXT NOT NULL, peso REAL NOT NULL, dtPesagem TEXT )"
    db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM pesagemanimal WHERE idAnimal = ?", [idAnimal],
            function(_, result) {
                if (result.rows.length > 1) {
                    var xValues = []; //datas
                    var yValues = []; //pesos
                    var rows = [];

                    //Converte string para data
                    for (item of result.rows) {
                        rows.push({
                            'peso': item.peso,
                            'data': new Date(item.dtPesagem)
                        });
                    }

                    //ordenar arr por data
                    rows.sort(function(a, b) {
                        return a.data.getTime() - b.data.getTime()
                    });


                    //adiciona os valores no eixo x e y
                    for (item of rows) {
                        var dt = `${item.data.getDate()}/${item.data.getMonth()+1}`;
                        xValues.push(dt);
                        yValues.push(item.peso);
                    }

                    new Chart("myChart", {
                        type: "line",
                        data: {
                            labels: xValues,
                            datasets: [{
                                fill: false,
                                lineTension: 0,
                                backgroundColor: "#ffc107",
                                borderColor: "#269740",
                                data: yValues
                            }]
                        },
                        options: {
                            legend: { display: false },

                        }
                    });
                } else {
                    window.getElementById('myChart').innerHTML = '<h1 class="blockquote text-center">Dados Insuficientes para calcular</h1>'
                }



            }
        );
    });


}

function ready() {
    createTableAnimals();
    criarTabelaBaixaAnimal();
    criarTabelaPesagemAnimal();
    if (document.getElementById('btn-save')) {
        document.getElementById('btn-save').addEventListener('click', save);
        getDietas(function(resultado) {
            console.log("Chamou getdietas");
            $(resultado.rows).each(function(index, dados) {
                let option = document.createElement('option');
                option.value = dados.id;
                option.innerHTML = dados.nome;
                $('#nomeDieta').append(option); //adicionar objeto ao select
            });
        });
        popularDados();
    } else if (document.getElementById("relatorio")) {
        popularDadosRelatorio();
        //gerarGrafico();
    }

}