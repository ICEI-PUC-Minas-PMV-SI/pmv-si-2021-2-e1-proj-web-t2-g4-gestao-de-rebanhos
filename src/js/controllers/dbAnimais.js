     //Criar ou abrir database
     var Database_Name = 'AnimaisDatabase';    
     var Version = 1.0;    
     var Text_Description = 'Database dos Animais';    
     var Database_Size = 2 * 1024 * 1024;    
     var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size, OnSuccessCreate());  
 
   
            
 function OnSuccessCreate() {    
     console.log('Database Created Sucessfully');    
 }  
 
   //cria tabela
   dbObj.transaction(function (tx) {    
    tx.executeSql('CREATE TABLE IF NOT EXISTS Cadastro_Animal (id integer primary key asc, Idade integer, Peso integer, Raça string not null, Sexo string,Dieta string, Data string)',
    [],
    function() {console.log("Tabela criada com sucesso!");},
    function(){alert("tabela não criada!")} 
    )
}); 
 function Insert() { 
     
     //inserir dados na tabela
     var idade = document.getElementById("age").value;    
     var peso = document.getElementById("weight").value;    
     var raça = document.getElementById("breed").value;  
     var sexo = document.getElementById("Sexo").value; 
     var dieta = document.getElementById("Diet").value;
     var data = document.getElementById("DataEntrada").value
     dbObj.transaction(function (tx) {    
         tx.executeSql('INSERT INTO Cadastro_Animal(Idade, Peso, Raça, Sexo,Dieta, Data) values(?,?,?,?,?,?);', 
         [idade,peso,raça,sexo,dieta,data],
         function(){console.log("Valores inseridos na tabela!!")},
         null);
  
     });    
 }  
