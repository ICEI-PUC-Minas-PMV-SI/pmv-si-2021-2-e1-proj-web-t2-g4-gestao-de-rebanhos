import { db } from "../system_utilities/db.js";

window.addEventListener("load", redy);

// Cria a tabela de usuários => users
function createTableSupplies() {
  var query =
    "CREATE TABLE IF NOT EXISTS supplies ( id INTEGER PRIMARY KEY,name TEXT,lote  TEXT, validade INTEGER,quantityIn TEXT, quantityOut TEXT)";
  db.transaction(function (tx) {
    tx.executeSql(query);
  });
}

function save() {
  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var lote = document.getElementById("lote").value;
  var validade = document.getElementById("validade").value;
  var quantityIn = document.getElementById("quantityIn").value;
  var quantityOut = document.getElementById("quantityOut").value;

  db.transaction(function (tx) {
    if (id) {
      tx.executeSql(
        "UPDATE supplies SET name=?, lote=?, validade=?, quantityIn=?, quantityOut=? WHERE id=?",
        [name, lote, validade, quantityIn, quantityOut, id],
        null
      );
      swal.fire({
        icon: "success",
        title: "Alteração feita com sucesso!",
      });
    } else {
      tx.executeSql(
        "INSERT INTO supplies ( name, quantity, quantityMin) VALUES (?, ?, ?)",
        [name, lote, validade, quantityIn, quantityOut]
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
}

function redy() {
  if (document.getElementById("btn-save")) {
    document.getElementById("btn-save").addEventListener("click", save);
    createSelectUser();
  }
  if (document.getElementById("btn-search"))
    document.getElementById("btn-search").addEventListener("click", search);
  createTableSupplies();
}
