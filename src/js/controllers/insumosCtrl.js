// import { db } from "../system_utilities/db.js";

var db = openDatabase("dbGado", "1.0", "DB Gado De Ouro", 2 * 1024 * 1024);

window.addEventListener("load", redy);

// Cria a tabela de usuários => users
function criarTabelaInsumos() {
  var query =
    "CREATE TABLE IF NOT EXISTS insumos ( id INTEGER PRIMARY KEY,name TEXT, fabricante TEXT, qty TEXT, validade INTEGER, lote  TEXT, entrada INTEGER, observacao TEXT)";
  db.transaction(function (tx) {
    tx.executeSql(query);
  });
}

function generateUUID() {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function salvarCadastroInsumos() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var fabricante = document.getElementById("fabricante").value;
  var qty = document.getElementById("qty").value;
  var validade = document.getElementById("validade").value;
  var lote = document.getElementById("lote").value;
  var entrada = document.getElementById("entrada").value;
  var observacao = document.getElementById("textArea").value;

  var validacao = true;
  var msgHtml = "";

  if (name.length <= 0) {
    validacao = false;
    msgHtml += "<p> - O campo <b>nome</b> é obrigatório.</p>";
  }
  if (fabricante.length <= 0) {
    validacao = false;
    msgHtml += "<p> - O campo <b>fabricante</b> é obrigatório.</p>";
  }
  if (qty.length <= 0) {
    validacao = false;
    msgHtml += "<p> - O campo <b>quantidade</b> é obrigatório.</p>";
  }
  if (validade.length <= 0) {
    validacao = false;
    msgHtml += "<p> - O campo <b>validaçãoo</b> é obrigatório.</p>";
  }
  if (lote.length <= 0) {
    validacao = false;
    msgHtml += "<p> - O campo <b>lote</b> é obrigatório.</p>";
  }
  if (entrada.length <= 0) {
    validacao = false;
    msgHtml += "<p> - O campo <b>data de entrada</b> é obrigatório.</p>";
  }

  if (validacao == true) {
    db.transaction(function (tx) {
      if (id) {
        tx.executeSql(
          "UPDATE insumos SET name=?, fabricante=?, qty=?, validade=?,lote=?, entrada=?, observacao=? WHERE id=?",
          [name, fabricante, qty, validade, lote, entrada, observacao],
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
        var newId = generateUUID();
        var arr = [
          newId,
          name,
          fabricante,
          qty,
          validade,
          lote,
          entrada,
          observacao,
        ];
        tx.executeSql(
          "INSERT INTO insumos (id, name, fabricante, qty, validade, lote, entrada, observacao) VALUES (?, ?, ?, ? , ? , ?, ? )",
          arr,
          //* callback sucesso
          function () {
            // tx.executeSql(
            //   'INSERT INTO usuarios ( nome, senha, email, tipoUsuario, logado, idColaborador) VALUES (?, "123456", ?, ?, 0, ?)',
            //   [nome, email, cargo, newId],
            //   function () {
            //     console.log("Deu certo");
            //   }
            // );
            // Limpa formulário
            document.getElementById("name").value = "";
            document.getElementById("fabricante").value = "";
            document.getElementById("qty").value = "";
            document.getElementById("validade").value = "";
            document.getElementById("lote").value = "";
            document.getElementById("entrada").value = "";
            document.getElementById("textArea").value = "";

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

function popularDados() {
  if (
    window.location.href.includes("?") &&
    window.location.href.split("?")[1].length == 36
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
          document.getElementById("fabricante").value = insumo.fabricante;
          document.getElementById("qty").value = insumo.qty;
          document.getElementById("validade").value = insumo.validade;
          document.getElmentById("lote").value = insumo.lote;
          document.getElementById("entrada").value = insumo.entrada;
          document.getElementById("textArea").value = insumo.textArea;

          //bloqueia os campos pois não podem ser alterados
          document.getElementById("validade").readOnly = true;
          document.getElementById("lote").readOnly = true;
        }
      );
    });
  }
}

function save() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var frabricante = document.getElementById("fabricante").value;
  var qty = document.getElementById("qty").value;
  var validade = document.getElementById("validade").value;
  var lote = document.getElementById("lote").value;

  db.transaction(function (tx) {
    if (id) {
      tx.executeSql(
        "UPDATE insumos SET nome=?, fabricante=?, qty=?, validade=?, lote=? WHERE id=?",
        [name, fabricante, qty, validade, lote, id],
        null
      );
      swal.fire({
        icon: "success",
        title: "Insumo alterado com sucesso!",
      });
    } else {
      tx.executeSql(
        "INSERT INTO Insumo ( name, fabricante, qty, validade, lote) VALUES (?, ?, ?, ?, ?)",
        [name, fabricante, qty, validade, lote]
      );
      swal.fire({
        icon: "success",
        title: "Insumo cadastrado com sucesso!",
      });
    }
  });

  document.getElementById("name").value = "";
  document.getElementById("fabricante");
  document.getElementById("qty").value = "";
  document.getElementById("validade").value = "";
  document.getElementById("lote").value = "";
}

function search() {
  var filterNome = document.getElementById("name").value;

  var tbody = document.getElementById("tbody-insumos");
  var total = document.getElementById("total");
  var table = document.getElementById("table-response");
  table.style.display = "block";

  var sqlWhere = "WHERE TRUE AND (";
  sqlWhere +=
    filterName !== null && filterName !== ""
      ? "name LIKE " + "'%" + filterName + "%'"
      : "TRUE";
  sqlWhere += ")";

  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM insumos " + sqlWhere,
      [],
      function (a, result) {
        var rows = result.rows;
        var tr = "";
        var btns =
          '<td class=" td-default"><a href="#" class="btn btn-primary btn-sm" title="Editar"><i class="fas fas fa-edit"></i></a><a href="#" class="btn btn-danger btn-sm btn-delete" title="Excluir"><i class="fas fa-trash"></i></a></td>\
            <td class=" td-btn-options">\
                <div class="btn-group">\
                    <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown">\
                            <i class="fa fa-bars"></i>\
                        </button>\
                    <div class="dropdown-menu">\
                        <a class="dropdown-item" href="#"><i class="fas fas fa-edit"></i> <span style="padding-left: .2em;">Ver</span> </a>\
                        <a class="dropdown-item" href="#"><i class="fas fa-trash"></i> <span style="padding-left: .3em;">Excluir</span></a>\
                    </div>\
                </div>\
            </td>';

        for (var i = 0; i < rows.length; i++) {
          if (rows[i].quantity > rows[i].quantityMin) {
            console.log("é maior");
          }
          tr +=
            rows[i].quantity < rows[i].quantityMin
              ? '<tr class="table-danger">'
              : "<tr>";
          tr += "<td>" + rows[i].name + "</td>";
          tr += "<td>" + rows[i].frabricante + "</td>";
          tr += "<td>" + rows[i].qty + "</td>";
          tr += "<td>" + rows[i].validade + "</td>";
          tr += "<td>" + rows[i].lote + "</td>";
          tr += btns;
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
  }
  if (document.getElementById("btn-search")) {
    document.getElementById("btn-search").addEventListener("click", search);
  }
  criarTabelaInsumos();
}
