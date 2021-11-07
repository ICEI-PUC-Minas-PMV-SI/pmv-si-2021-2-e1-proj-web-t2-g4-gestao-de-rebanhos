import { db } from "../system_utilities/db.js";

window.addEventListener("load", redy);

var Database_Name = "InsumosDatabase";
var Version = 1.0;
var Text_Description = "Database de Insumos";
var Database_Size = 2 * 1024 * 1024;
var dbObj = openDatabase(
  Database_Name,
  Version,
  Text_Description,
  Database_Size,
  OnSuccessCreate()
);

function OnSuccessCreate() {
  console.log("Database Created Sucessfully");
}

function insert() {
  dbObj.transaction(function (tx) {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS Baixa_Insumos ( id INTEGER PRIMARY KEY,name TEXT,lote  TEXT, validade INTEGER,quantityIn TEXT, quantityOut TEXT)",
      [],
      function () {
        console.log("Tabela criada com sucesso!");
      },
      function () {
        alert("tabela não criada!");
      }
    );
  });

  var id = document.getElementById("id").value;
  var name = document.getElementById("name").value;
  var lote = document.getElementById("lote").value;
  var validade = document.getElementById("validade").value;
  var quantityIn = document.getElementById("quantityIn").value;
  var quantityOut = document.getElementById("quantityOut").value;

  db.transaction(function (tx) {
    if (id) {
      tx.executeSql(
        "UPDATE Baixa_Insumos  SET name=?, lote=?, validade=?, quantityIn=?, quantityOut=? WHERE id=?",
        [name, lote, validade, quantityIn, quantityOut, id],
        null
      );
      swal.fire({
        icon: "success",
        title: "Baixa alterada com sucesso!!",
      });
    } else {
      tx.executeSql(
        "INSERT INTO Baixa_Insumos  ( name, quantity, quantityMin) VALUES (?, ?, ?)",
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
    document.getElementById("btn-save").addEventListener("click", insert);
  }
  if (document.getElementById("btn-search"))
    document.getElementById("btn-search").addEventListener("click", search);
}
