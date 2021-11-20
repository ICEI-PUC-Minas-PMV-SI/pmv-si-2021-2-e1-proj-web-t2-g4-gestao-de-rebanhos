import { db } from '../system_utilities/db.js'; // cria o banco de dados sqlite no próprio navegador


let tpUser;

window.addEventListener('load', redy); // quando a página estiver completamente carregada executa a funcão redy

// Cria a tabela de usuários => users
function createTableUser() {
    var query = "CREATE TABLE IF NOT EXISTS usuarios ( id INTEGER PRIMARY KEY,nome TEXT, senha TEXT, email TEXT, tipoUsuario INTEGER, logado INTEGER, idColaborador TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });
}

// Insere novos usuários na tabela users
function insertUsers(name, pass, mail, typeUser, isLogged) {
    var query = "INSERT INTO usuarios ( nome, senha, email, tipoUsuario, logado) VALUES (?, ?, ?, ?, ?)";
    db.transaction(function(tx) {
        tx.executeSql(query, [name, pass, mail, typeUser, isLogged]);
    });

}

// Verifica se há algum usuário inserido na tabela users e se necessário insere
function usersIsEmpty() {

    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM usuarios', [], function(tx, result) {
            if (result.rows.length == 0) {
                insertUsers('Bruno Mezenga', '123456', 'bruno@reidogado.com', 1, 0);
                insertUsers('Adolf Stalin', '123456', 'adolf@reidogado.com', 2, 0);
            }
        }, null);
    });

}


function login() {
    // TODO: implementar resposta para o usuario usando o swegger
    var email = document.getElementById('email').value;
    var pass = document.getElementById('password').value;

    if ((email && email.length > 6) && (pass && pass.length > 3)) {
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, pass], function(tx, result) {
                if (result.rows.length > 0) {
                    var id = result.rows[0].id;
                    tx.executeSql('UPDATE usuarios SET logado=1 WHERE id=?', [id], null);
                    window.location.replace("../../views/shared/workspage.html");
                } else {
                    console.log('Usuário não encontrado');
                    swal.fire({
                        icon: "error",
                        title: "Usuário não encontrado",
                    });
                }
            }, null);
        });
    } else {
        console.log('Preencha os campos corretamente!');
        swal.fire({
            icon: "error",
            title: "Preencha os campos corretamente!",

        });
    }
}

function isLogged() {
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM usuarios WHERE logado = 1', [], function(tx, result) {
            if (result.rows.length > 0) {
                // É utilizado o replace() porque não mantém a página de origem no histórico da sessão
                window.location.replace("../../views/shared/workspage.html");
            }
        }, null);
    });
}

function redy() {
    document.getElementById('btn-login').addEventListener('click', login);
    createTableUser();
    usersIsEmpty();
    isLogged();
}