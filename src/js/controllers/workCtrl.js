import { db } from '../system_utilities/db.js'; // permite acessar o banco de dados sqlite no próprio navegador


window.addEventListener('load', redy);


function isLoggedCtrl() {
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM users WHERE isLogged = 0', [], function(tx, result) {
            if (result.rows.length > 0) {
                console.log('entrou');
                //setTypeUser(result.rows[0].typeUser);


                // É utilizado o replace() porque não mantém a página de origem no histórico da sessão
                //window.location.replace("../../template_padrao.html");
            }
        }, null);
    });
}


function redy() {
    isLoggedCtrl();
}