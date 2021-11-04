//Criar database e abrir
var Database_Name = 'DietasDatabase';    
var Version = 1.0;    
var Text_Description = 'Database das Dietas';    
var Database_Size = 2 * 1024 * 1024;    
var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size, OnSuccessCreate());  

           
function OnSuccessCreate() {    
    console.log('Database Created Sucessfully');    
} 
 //cria tabela
 dbObj.transaction (function(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS Cadastro_Dietas (id integer primary key asc, nomeDieta string, QuantidadeInsumos integer, NomeInsumo string, Quantidade integer, duração integer)',
    [],
    function (){console.log("Tabela criada com sucesso!")},
    function (){console.log ("Erro ao criar tabela!!")}  
    );
}   
);

function Insert(){

    //pega valor dos inputs do formulario
    var dieta = document.getElementById("dietname").value;
    var qtdinsumos = document.getElementById("Quantidadeinsumos").value;

    var nomeinsumo = "";
    var quantidade = "";
    var duracao = "";
    
    for (var i= 1; i <= qtdinsumos;i++){
    nomeinsumo +=  document.getElementById("supplyname"+i).value + "   ";
    quantidade +=  document.getElementById("quantity"+i).value + "   ";
    duracao += document.getElementById("duration"+i).value + "   ";
    //inserir na tabela
    dbObj.transaction (function(tx){
        tx.executeSql ('INSERT INTO Cadastro_Dietas(nomeDieta, QuantidadeInsumos, NomeInsumo, Quantidade, duração) values(?,?,?,?,?)',
        [dieta,qtdinsumos,nomeinsumo,quantidade,duracao],
        function(){alert("tabela preenchida!")},
        null
        );
    }
    );
    }

}''
