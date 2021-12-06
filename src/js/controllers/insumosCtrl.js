// import { db } from "../system_utilities/db.js";

var db = openDatabase("dbGado", "1.0", "DB Gado De Ouro", 2 * 1024 * 1024);

window.addEventListener("load", redy);

//Cria a tabela de insumos
function criarTabelaInsumos() {
    var query =
        "CREATE TABLE IF NOT EXISTS insumos ( id INTEGER PRIMARY KEY,name TEXT NOT NULL, qtd REAL NOT NULL, qtdMin REAL NOT NULL)";
    db.transaction(function(tx) {
        tx.executeSql(query);
        console.log("criou");
    });
}

//Cria a tabela de baixa de insumos
function criarTabelaBaixaInsumos() {
    var query =
        "CREATE TABLE IF NOT EXISTS baixaInsumo (id INTEGER PRIMARY KEY, name TEXT NOT NULL, idInsumo INTEGER, qtdSaida REAL NOT NULL, motivo TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });
}

function salvarCadastroInsumos() {
    var id = document.getElementById("id").value;
    var name = document.getElementById("name").value;
    var qtd = document.getElementById("qtd").value;
    var qtdMin = document.getElementById("qtdMin").value;

    var validacao = true;
    var msgHtml = "";

    if (name.length <= 0) {
        validacao = false;
        msgHtml += "<p> - O campo <b>nome</b> é obrigatório.</p>";
    }

    if (qtd.length <= 0) {
        validacao = false;
        msgHtml += "<p> - O campo <b>quantidade</b> é obrigatório.</p>";
    }
    if (qtdMin.length <= 0) {
        validacao = false;
        msgHtml += "<p> - O campo <b>Quantidade Min</b> é obrigatório.</p>";
    }

    if (validacao == true) {
        debugger;
        db.transaction(function(tx) {
            if (id) {
                tx.executeSql(
                    "UPDATE insumos SET qtdMin=? WHERE id=?", [qtdMin, id],
                    //*callback sucesso
                    function() {
                        swal.fire({
                            icon: "success",
                            title: "Insumo alterado com sucesso!",
                        });
                    },
                    //*callback falha
                    function(_, msg) {
                        console.log(msg);
                        swal.fire({
                            icon: "error",
                            title: "Falha ao relizar a alteração.",
                        });
                    }
                );
            } else {
                var arr = [name, qtd, qtdMin];
                tx.executeSql(
                    "INSERT INTO insumos (name, qtd, qtdMin) VALUES (?, ?, ? )",
                    arr,
                    //* callback sucesso
                    function() {
                        // Limpa formulário
                        document.getElementById("name").value = "";
                        document.getElementById("qtd").value = "";
                        document.getElementById("qtdMin").value = "";

                        //modal para informar o usuario
                        swal.fire({
                            icon: "success",
                            title: "Insumo cadastrado com sucesso!",
                        });
                    },
                    //* callback falha
                    function(_, e) {
                        //modal para informar o usuario
                        console.log(e);
                        swal.fire({
                            icon: "error",
                            title: "Falha ao cadastrar insumo.",
                        });
                    }
                );
            }
        });
    } else {
        swal.fire({
            icon: "error",
            title: "Preencha os campos corretamente.",
            html: msgHtml,
        });
    }
}

function editar(id) {
    window.location.href = "../insumos/cadastro_insumos.html?" + id;
}

function deletar(id) {
    Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter essa ação!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, vou deletar!",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            confirmarDelete(id);
        }
    });
}

function confirmarDelete(id) {
    db.transaction(function(tx) {
        tx.executeSql(
            "DELETE FROM insumos WHERE id = ?", [id],
            //callback sucesso

            //callback sucesso
            function() {
                var tdExcluir = document.getElementById(id);
                tdExcluir.style.display = "none";
                var total = document.getElementById("total").innerHTML;
                document.getElementById("total").innerHTML = --total;
                console.log("Confirmou delete. Id =  " + id);
                Swal.fire("Deletado!", "Insumo deletado com sucesso!", "success");
            },
            //calback falha
            function() {
                swal.fire({
                    icon: "error",
                    title: "Falha em deletar.",
                });
            }
        );
    });
}

function search() {
    var filterName = document.getElementById("name").value;

    var tbody = document.getElementById("tbody-insumos");
    var total = document.getElementById("total");
    var table = document.getElementById("table-response");
    table.style.display = "block";

    var sqlWhere = "WHERE TRUE AND (";
    sqlWhere +=
        filterName !== null && filterName !== "" ?
        "name LIKE " + "'%" + filterName + "%'" :
        "TRUE";
    sqlWhere += " )";

    db.transaction(function(tx) {
        tx.executeSql(
            "SELECT * FROM insumos " + sqlWhere, [],
            function(a, result) {
                var rows = result.rows;
                var tr = "";

                for (var i = 0; i < rows.length; i++) {
                    var btns = `
                        <td class=" td-btn-options">\
                            <div class="btn-group">\
                                <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown">\
                                    <i class="fa fa-bars"></i>\
                                </button>\
                            <div class="dropdown-menu">\
                                <a class="dropdown-item" onclick="editar('${rows[i].id}')" href="#"><i class="fas fas fa-edit"></i> <span style="padding-left: .2em;">Editar</span> </a>
                                <a class="dropdown-item" onclick="deletar('${rows[i].id}')" href="#"><i class="fas fa-trash"></i> <span style="padding-left: .3em;">Excluir</span></a>
                                <a class="dropdown-item" onclick="baixa('${rows[i].id}', '${rows[i].name}','${rows[i].qtd}')" href="#"><i class="fa-arrow-circle-down fa"></i> <span style="padding-left: .3em;">Baixa</span></a>
                            </div>\
                        </div>\
                      </td>`;

                    tr +=
                        rows[i].qtd < rows[i].qtdMin ?
                        `<tr class="table-danger" id="${rows[i].id}">` :
                        `<tr id="${rows[i].id}">`;
                    tr += "<td>" + rows[i].name + "</td>";
                    tr += "<td>" + rows[i].qtd + "</td>";
                    tr += "<td>" + rows[i].qtdMin + "</td>";
                    tr += btns;
                    tr += "</tr>";
                }
                tbody.innerHTML = tr;
                total.innerHTML = rows.length;
            }
        );
    });
}

function popularDados() {
    var url = window.location.href.replace(/#/g, "");

    if (
        window.location.href.includes("?") &&
        window.location.href.split("?")[1].length >= 1
    ) {
        var id = window.location.href.split("?")[1];

        db.transaction(function(tx) {
            tx.executeSql(
                "SELECT * FROM insumos WHERE id = ?", [id],
                function(_, result) {
                    var insumo = result.rows[0];

                    //adiciona o valor nos inputs advindos do bdd
                    document.getElementById("id").value = insumo.id;
                    document.getElementById("name").value = insumo.name;
                    document.getElementById("qtd").value = insumo.qtd;
                    document.getElementById("qtdMin").value = insumo.qtdMin;

                    //bloqueia os campos pois não podem ser alterados
                    document.getElementById("qtd").readOnly = true;
                    document.getElementById("name").readOnly = true;
                }
            );
        });
    }
}

function baixa(idInsumo, name, qtd) {
    (async() => {
        const { value: formValues } = await Swal.fire({
            title: "Baixa Insumo",
            html: `<div class="container-fluid">
          <p style="font-weight: bold;">Os dados com (*) são obrigatórios</p>
          <div class="row">
              <div class="col-sm-6">
                  <div class="form-group">
                      <label class="float-left">Quantidade Usada*</label>
                      <input id="qtd" class="form-control text-uppercase" type="number" maxlength="10" />
                  </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label>Motivo</label>
                  <select class="form-control" id="motivo" name="motivo">
                      <option value=""></option>
                      <option value="Descarte">Descarte</option>
                      <option value="Uso Padrão">Uso Padrão</option>
                      <option value="Outros">Outros</option>
                  </select>
                </div>
              </div>
          </div>
      </div>`,
            focusConfirm: false,
            confirmButtonText: "Confirmar",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            preConfirm: () => {
                return [
                    document.getElementById("qtd").value,
                    document.getElementById("motivo").value,
                ];
            },
        });
        if (formValues[0].length >= 1 && formValues[1].length >= 1) {
            var qtdUsada = formValues[0];
            var motivo = formValues[1];

            if (qtdUsada < qtd) {
                qtd -= qtdUsada;

                db.transaction(function(tx) {
                    tx.executeSql(
                        "INSERT INTO baixaInsumo (idInsumo, name, qtdSaida, motivo ) VALUES (?, ?, ?, ?)", [idInsumo, name, qtdUsada, motivo],
                        //Callback sucesso
                        function() {
                            tx.executeSql(
                                "UPDATE insumos SET qtd=? WHERE id=?", [qtd, idInsumo],
                                //*callback sucesso
                                function() {
                                    Swal.fire({
                                        title: "Insumo alterado com sucesso!",
                                        icon: "success",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            search();
                                        }
                                    });
                                }
                            );
                        },
                        //Callback falha
                        function() {
                            swal.fire({
                                icon: "error",
                                title: "Falha em alterar o estoque!",
                            });
                        }
                    );
                });
            } else {
                swal.fire({
                    icon: "warning",
                    title: "Quantidade insuficiente no estoque!",
                });
            }
        } else {
            swal.fire({
                icon: "error",
                title: "Preencha os dados obrigatórios!",
            });
        }
    })();
}

function buscarBaixas() {
    var filterName = document.getElementById("name").value;
    var filterMotivo = document.getElementById("motivo").value;

    var tbody = document.getElementById("tbody-insumos");
    var total = document.getElementById("total");
    var table = document.getElementById("table-response");
    table.style.display = "block";

    var sqlWhere = "WHERE TRUE AND (";
    sqlWhere +=
        filterName !== null && filterName !== "" ?
        "name LIKE " + "'%" + filterName + "%'" :
        "TRUE";
    sqlWhere += " AND ";
    sqlWhere +=
        filterMotivo !== null && filterMotivo !== "" ?
        "motivo LIKE " + "'%" + filterMotivo + "%'" :
        "TRUE";
    sqlWhere += " AND ";
    sqlWhere += " TRUE )";

    db.transaction(function(tx) {
        tx.executeSql(
            "SELECT * FROM baixaInsumo " + sqlWhere, [],
            function(a, result) {
                var rows = result.rows;
                var tr = "";

                for (var i = 0; i < rows.length; i++) {
                    tr += `<tr id="${rows[i].id}">`;
                    tr += "<td>" + rows[i].name + "</td>";
                    tr += "<td>" + rows[i].idInsumo + "</td>";
                    tr += "<td>" + rows[i].qtdSaida + "</td>";
                    tr += "<td>" + rows[i].motivo + "</td>";
                    tr += "</tr>";
                }
                tbody.innerHTML = tr;
                total.innerHTML = rows.length;
            }
        );
    });
}

function redy() {
    if (document.getElementById("btn-save")) {
        document
            .getElementById("btn-save")
            .addEventListener("click", salvarCadastroInsumos);
        popularDados();
    } else if (document.getElementById("btn-search")) {
        search();
    } else {
        buscarBaixas();
    }
}