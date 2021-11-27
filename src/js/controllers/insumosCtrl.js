// import { db } from "../system_utilities/db.js";

var db = openDatabase("dbGado", "1.0", "DB Gado De Ouro", 2 * 1024 * 1024);

window.addEventListener("load", ready);

//Cria a tabela de insumos
function criarTabelaInsumos() {
  var query =
    "CREATE TABLE IF NOT EXISTS insumos ( id INTEGER PRIMARY KEY,name TEXT NOT NULL UNIQUE, qtd REAL NOT NULL, qtdMin REAL NOT NULL)";
  db.transaction(function (tx) {
    tx.executeSql(query);
    console.log("criou");
  });
}

//Cria a tabela de baixa de insumos
function criarTabelaBaixaInsumos() {
  var query =
    "CREATE TABLE IF NOT EXISTS baixaInsumo (id INTEGER PRIMARY KEY, name TEXT NOT NULL, qtdSaida REAL NOT NULL, motivo TEXT)";
  db.transaction(function (tx) {
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
    db.transaction(function (tx) {
      if (id) {
        tx.executeSql(
          "UPDATE insumos SET name=?, qtd=?, qtdMin=?, WHERE id=?",
          [name, qtd, qtdMin, id],
          //*callback sucesso
          function () {
            swal.fire({
              icon: "success",
              title: "Insumo alterado com sucesso!",
            });
          },
          //*callback falha
          function () {
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
          function () {
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
          function (_, e) {
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
  db.transaction(function (tx) {
    tx.executeSql(
      "DELETE FROM insumos WHERE id = ?",
      [id],
      //callback sucesso

      //callback sucesso
      function () {
        var tdExcluir = document.getElementById(id);
        tdExcluir.style.display = "none";
        console.log("Confirmou delete. Id =  " + id);
        Swal.fire("Deletado!", "Insumo deletado com sucesso!", "success");
      },
      //calback falha
      function () {
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
    filterName !== null && filterName !== ""
      ? "name LIKE " + "'%" + filterName + "%'"
      : "TRUE";  
  sqlWhere += " )";
  console.log (sqlWhere);

  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM insumos " + sqlWhere,
      [],
      function (a, result) {
        var rows = result.rows;
        var tr = "";

        for (var i = 0; i < rows.length; i++) {
          var btns = `<td class=" td-default"><a href="#" onclick="editar('${rows[i].id}')" class="btn btn-primary btn-sm" title="Editar"><i class="fas fas fa-edit"></i></a>
                        <a href="#" onclick="deletar('${rows[i].id}')" class="btn btn-danger btn-sm btn-delete" title="Excluir"><i class="fas fa-trash"></i></a></td>\
                        <td class=" td-btn-options">\
                            <div class="btn-group">\
                                <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown">\
                                    <i class="fa fa-bars"></i>\
                                </button>\
                            <div class="dropdown-menu">\
                                <a class="dropdown-item" onclick="editar('${rows[i].id}')" href="#"><i class="fas fas fa-edit"></i> <span style="padding-left: .2em;">Editar</span> </a>
                                <a class="dropdown-item" onclick="deletar('${rows[i].id}')" href="#"><i class="fas fa-trash"></i> <span style="padding-left: .3em;">Excluir</span></a>
                            </div>\
                        </div>\
                      </td>`;

          tr += `<tr id="${rows[i].id}">`;
          tr += "<td>" + rows[i].name + "</td>";
          tr += "<td>" + rows[i].qtd + "</td>";
          tr += "<td>" + rows[i].qtdMin + "</td>";
          tr += btns;
          tr += "</tr>";

          // tr +=
          //   rows[i].qtd < rows[i].qtdMin
          //     ? '<tr class="table-danger" >'
          //     : "<tr>";
          // tr += "<td>" + rows[i].name + "</td>";
          // tr += "<td>" + rows[i].qtd + "</td>";
          // tr += "<td>" + rows[i].qtdMin + "</td>";
          // tr += btns;
          // tr += "</tr>";
        }
        tbody.innerHTML = tr;
        total.innerHTML = rows.length;
      }, 
      function (_,erro) {
        console.log (erro);
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

    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM insumos WHERE id = ?",
        [id],
        function (_, result) {
          var insumo = result.rows[0];

          //adiciona o valor nos inputs advindos do bdd
          document.getElementById("id").value = insumo.id;
          document.getElementById("name").value = insumo.name;
          document.getElementById("qtd").value = insumo.qtd;
          document.getElementById("qtdMin").value = insumo.qtdMin;

          //bloqueia os campos pois não podem ser alterados
          document.getElementById("qtd").readOnly = true;
        }
      );
    });
  }
}

function ready() {
  criarTabelaInsumos();
  criarTabelaBaixaInsumos();
  if (document.getElementById("btn-save")) {
    document
      .getElementById("btn-save")
      .addEventListener("click", salvarCadastroInsumos);
    popularDados();
  }
  if (document.getElementById("btn-search")) {
    document.getElementById("btn-search").addEventListener("click", search);
  }
}
