import { db } from '../system_utilities/db.js';

window.addEventListener('load', redy);

// Cria a tabela de animais => animais
function createTableAnimals() {
    var query = "CREATE TABLE IF NOT EXISTS animais (id INTEGER PRIMARY KEY, tag varchar not null, raca varchar not null ,idade INTEGER,sexo varchar not null,peso REAL not null,nomeDieta varchar not null)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });
    console.log("criar tabela"); 
}


// Executar função
function redy() {
    createTableAnimals();
    if (document.getElementById('salvar')) {
        document.getElementById('salvar').addEventListener('click', salvar);
    }


}

function salvar() {
    //gerar tag
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    var id = document.getElementById('id').value;
    var tag = makeid(8);
    var idade = document.getElementById('idade').value;
    var peso= document.getElementById('peso').value;
    var raca= document.getElementById('raca').value;
    var sexo= document.getElementById('sexo').value;
    var nomeDieta= document.getElementById('listaDietas').value;
    var validacao= true;

    //Não deixar cadastrar em vazio
    if (tag.length<=0){
        validacao=false
    }
    if (idade.length<=0){
        validacao=false
    }
    if (peso.length<=0){
        validacao=false
    }
    if (raca.length<=0){
        validacao=false
    }
    if (sexo.length<=0){
        validacao=false
    }
    if (nomeDieta.length<=0){
        validacao=false
    }


    if(validacao==true){
        db.transaction(function(tx) {
            if(id){
                tx.executeSql('UPDATE animais SET idade=?, sexo=?, peso=?, nomeDieta=?, WHERE id=?', [idade, sexo, peso, nomeDieta, id],
                    // Callback sucesso
                    function() {
                        swal.fire({
                            icon: "success",
                            title: "Animal alterado com sucesso!",
                        });
                    },
                    // Callback erro
                    function() {
                        swal.fire({
                            icon: "error",
                            title: "Falhou",
                        });
                    }
                );
                
                }
                else{
                    tx.executeSql('INSERT INTO animais (tag, raca, idade, sexo, peso, nomeDieta) VALUES (?, ?, ?, ?, ?, ?)', [tag, raca, idade, sexo, peso, nomeDieta],
                    // Callback sucesso
                    function() {
                        swal.fire({
                            icon: "success",
                            title: "Animal cadastrado com sucesso!",
                        });
                    },
                    // Callback erro
                    function(tx,erro) {
                         console.log("erro");
                         console.log(erro);
                    }
                );
                    
                }
            
        });   
    }
    else{
        swal.fire({
            icon: "error",
            title: "Preencha os campos corretamente",
        });
    }
}
