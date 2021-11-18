     //Criar ou abrir database
     import { db } from '../system_utilities/db.js';
 
 
   //cria tabela
   function criaTabelaAnimais(){
   db.transaction(function (tx) {    
    tx.executeSql('CREATE TABLE IF NOT EXISTS Cadastro_Animal (id integer primary key asc, Idade integer, Peso integer, Raça string not null, Sexo string,Dieta string, Data string)',
    [],
    function() {console.log("Tabela criada com sucesso!");},
    function(){alert("tabela não criada!")} 
    )
}); 
   } 
 function Insert() { 
     
     //inserir dados na tabela
     var idade = document.getElementById("age").value;    
     var peso = document.getElementById("weight").value;    
     var raça = document.getElementById("breed").value;  
     var sexo = document.getElementById("Sexo").value; 
     var dieta = document.getElementById("Diet").value;
     var data = document.getElementById("DataEntrada").value
     db.transaction(function (tx) {    
         tx.executeSql('INSERT INTO Cadastro_Animal(Idade, Peso, Raça, Sexo,Dieta, Data) values(?,?,?,?,?,?);', 
         [idade,peso,raça,sexo,dieta,data],
         function(){console.log("Valores inseridos na tabela!!")},
         null);
  
     });    
 }  
