import { db } from "../system_utilities/db.js";

window.addEventListener("load", redy);

function createTableSupplies() {
  var query =
    "CREATE TABLE IF NOT EXISTS Cadastro_Insumos ( id INTEGER PRIMARY KEY,name TEXT, fabricante TEXT, qty TEXT, validade INTEGER, lote  TEXT, entrada INTEGER, observacao TEXT)";
  db.transaction(function (tx) {
    tx.executeSql(query);
  });
}

function save() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var fabricante = document.getElementById("fabricante").value;
  var qty = document.getElementById("qty").value;
  var validade = document.getElementById("validade").value;
  var lote = document.getElementById("lote").value;
  var entrada = document.getElementById("entrada").value;
  var observacao = document.getElementById("textArea").value;

  db.transaction(function (tx) {
    if (id) {
      tx.executeSql(
        "UPDATE Cadastro_Insumos  SET name=?, fabricante=?, qty=?, validade=?,lote=?, entrada=?, observacao=? WHERE id=?",
        [name, fabricante, qty, validade, lote, entrada, observacao],
        null
      );
      swal.fire({
        icon: "success",
        title: "Cadastro alterado com sucesso!",
      });
    } else {
      tx.executeSql(
        "INSERT INTO Cadastro_Insumos  ( name, fabricante, qty, validade, lote, entrada, observacao) VALUES (?, ?, ?, ? , ? , ?, ? )",
        [name, fabricante, qty, validade, lote, entrada, observacao]
      );
      swal.fire({
        icon: "success",
        title: "Cadastro realizado com sucesso!",
      });
    }
  });
  document.getElementById("name").value = "";
  document.getElementById("fabricante").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("validade").value = "";
  document.getElementById("lote").value = "";
  document.getElementById("entrada").value = "";
  document.getElementById("textArea").value = "";
}

function redy() {
  if (document.getElementById("btn-save")) {
    document.getElementById("btn-save").addEventListener("click", save);
  }
  if (document.getElementById("btn-search")) {
    document.getElementById("btn-search").addEventListener("click", search);
  }
  createTableSupplies();
}
