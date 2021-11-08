import { db } from "../system_utilities/db.js";

window.addEventListener("load", redy);

// Cria a tabela
function createTableSupplies() {
  var query =
    "CREATE TABLE IF NOT EXISTS Baixa_Insumos ( id INTEGER PRIMARY KEY,name TEXT,lote  TEXT, validade INTEGER,quantityIn TEXT, quantityOut TEXT, observacao TEXT)";
  db.transaction(function (tx) {
    tx.executeSql(query);
  });
}
function insert(name, lote, validade, quantityIn, quantityOut, observacao) {
  var query =
    "INSERT INTO Baixa_Insumos ( name, lote, validade, quantityIn, quantityOut, observacao) VALUES (?, ?, ?, ?, ?,?)";
  db.transaction(function (tx) {
    tx.executeSql(query, [
      name,
      lote,
      validade,
      quantityIn,
      quantityOut,
      observacao,
    ]);
  });
}

function insumoIsEmpty() {
  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM Baixa_Insumos",
      [],
      function (tx, result) {
        if (result.rows.length == 0) {
          insert("Bruno Mezenga", "123456", "bruno@reidogado.com", 1, 0, "rrr");
          insert("Adolf Stalin", "123456", "adolf@reidogado.com", 2, 0, "sss");
        }
      },
      null
    );
  });
}

function save() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var lote = document.getElementById("lote").value;
  var validade = document.getElementById("validade").value;
  var quantityIn = document.getElementById("quantityIn").value;
  var quantityOut = document.getElementById("quantityOut").value;
  var observacao = document.getElementById("textArea").value;

  db.transaction(function (tx) {
    if (id) {
      tx.executeSql(
        "UPDATE Baixa_Insumos SET name=?, lote=?, validade=?, quantityIn=?, quantityOut=?, observacao =? WHERE id=?",
        [id, name, lote, validade, quantityIn, quantityOut, observacao],
        null
      );
      swal.fire({
        icon: "success",
        title: "Alteração feita com sucesso!",
      });
    } else {
      tx.executeSql(
        "INSERT INTO Baixa_Insumos ( name, lote, validade, quantityIn, quantityOut, obsrvacao) VALUES (?, ?, ?, ?, ?, ?)",
        [name, lote, validade, quantityIn, quantityOut, observacao]
      );
      swal.fire({
        icon: "success",
        title: "Baixa realizada com sucesso!",
      });
    }
  });

  document.getElementById("name").value = "";
  document.getElementById("lote").value = "";
  document.getElementById("validade").value = "";
  document.getElementById("quantityIn").value = "";
  document.getElementById("quantityOut").value = "";
  document.getElementById("textArea").value = "";
}

function redy() {
  if (document.getElementById("btn-save")) {
    document.getElementById("btn-save").addEventListener("click", save);
    createTableSupplies();
    // insumoIsEmpty();
  }
  if (document.getElementById("btn-search"))
    document.getElementById("btn-search").addEventListener("click", search);
  createTableSupplies();
}
