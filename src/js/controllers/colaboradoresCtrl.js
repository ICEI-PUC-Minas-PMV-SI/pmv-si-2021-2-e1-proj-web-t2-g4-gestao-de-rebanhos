//import { db } from '../system_utilities/db.js'; // permite acessar o banco de dados sqlite no próprio navegador
var db = openDatabase("dbGado", "1.0", "DB Gado De Ouro", 2 * 1024 * 1024);

window.addEventListener('load', ready);



// CRIA TABELA DE COLABORADOES NO BANCO DE DADOS
function criarTabelaColaboradores() {
    var query = "CREATE TABLE IF NOT EXISTS colaboradores ( id TEXT PRIMARY KEY, nome TEXT NOT NULL, idade INTEGER NOT NULL, email TEXT NOT NULL, cargo INTEGER NOT NULL)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });
}


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) { //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else { //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


//* Salva ou altera os dados do formulário de colaboradores.
//* Também cria um usuário para o sistema na tabela de usuários.
function salvar() {
    var id = document.getElementById('id').value;
    var nome = document.getElementById('nome').value;
    var idade = document.getElementById('idade').value;
    var email = document.getElementById('email').value;
    var cargo = document.getElementById('cargo').value;


    var validacao = true;
    var msgHtml = '';

    if (nome.length <= 0) {
        validacao = false;
        msgHtml += '<p> - O campo <b>nome</b> é obrigatório.</p>';
    }
    if (idade.length <= 0) {
        validacao = false;
        msgHtml += '<p> - O campo <b>idade</b> é obrigatório.</p>';
    }
    if (email.length <= 0) {
        validacao = false;
        msgHtml += '<p> - O campo <b>email</b> é obrigatório.</p>';
    }
    if (cargo.length <= 0) {
        validacao = false;
        msgHtml += '<p> - O campo <b>cargo</b> é obrigatório.</p>';
    }



    if (validacao == true) {
        db.transaction(function(tx) {
            if (id) {
                tx.executeSql('UPDATE colaboradores SET nome=?, idade=?, cargo=? WHERE id=?', [nome, idade, cargo, id],
                    //*callback sucesso
                    function() {
                        swal.fire({
                            icon: "success",
                            title: "Colaborador alterado com sucesso!",
                        });
                    },
                    //*callback falha
                    function() {
                        swal.fire({
                            icon: "error",
                            title: "Falha em alterar o colaborador.",
                        });
                    }
                )

            } else {
                var newId = generateUUID();
                var arr = [newId, nome, idade, email, cargo];
                tx.executeSql('INSERT INTO colaboradores (id, nome, idade, email, cargo) VALUES (?, ?, ?, ?, ?); ', arr,
                    //* callback sucesso
                    function() {
                        tx.executeSql('INSERT INTO usuarios ( nome, senha, email, tipoUsuario, logado, idColaborador) VALUES (?, "123456", ?, ?, 0, ?)', [nome, email, cargo, newId],
                            function() {
                                console.log('Deu certo');
                            }
                        );
                        // Limpa formulário
                        document.getElementById('nome').value = '';
                        document.getElementById('idade').value = '';
                        document.getElementById('email').value = '';
                        document.getElementById('cargo').value = '';


                        //modal para informar o usuario
                        swal.fire({
                            icon: "success",
                            title: "Colaborador cadastrado com sucesso!",
                        });
                    },
                    //* callback falha
                    function(_, e) {
                        //modal para informar o usuario
                        console.log(e);
                        swal.fire({
                            icon: "error",
                            title: "Falha ao cadastrar colaborador.",
                        });
                    },

                );

            }
        });
    } else {
        swal.fire({
            icon: "error",
            title: "Preencha os campos corretamente.",
            html: msgHtml
        });
    }


}

function editar(id) {
    window.location.href = "../colaboradores/cadastro_colaborador.html?" + id;
}

function deletar(id) {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você não poderá reverter essa ação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, vou deletar!',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            confirmarDelete(id);
        }
    })
}

function confirmarDelete(id) {

    db.transaction(function(tx) {
        tx.executeSql("DELETE FROM colaboradores WHERE id = ?", [id],
            //callback sucesso
            function() {
                tx.executeSql("DELETE FROM usuarios WHERE idColaborador = ?", [id],
                    //callback sucesso
                    function() {
                        var tdExcluir = document.getElementById(id);
                        var total = document.getElementById('total').innerHTML;
                        document.getElementById('total').innerHTML = --total;

                        tdExcluir.style.display = 'none';
                        console.log('Confirmou delete. Id =  ' + id);
                        Swal.fire(
                            'Deletado!',
                            'Colaborador deletado com sucesso!',
                            'success'
                        )
                    }
                );
            },
            //calback falha
            function() {
                swal.fire({
                    icon: "error",
                    title: "Falha em deletar o colaborador.",
                });
            }
        );
    });



}


function buscar() {
    var filterName = document.getElementById('nome').value;
    var filterEmail = document.getElementById('email').value;
    var filterCargo = document.getElementById('cargo').value;

    var tbody = document.getElementById('tbody-colaboradores');
    var total = document.getElementById('total');
    var table = document.getElementById('table-response');
    table.style.display = 'block';

    var sqlWhere = 'WHERE TRUE AND (';
    sqlWhere += (filterName !== null && filterName !== "") ? 'nome LIKE ' + "'%" + filterName + "%'" : 'TRUE';
    sqlWhere += ' AND ';
    sqlWhere += (filterEmail !== null && filterEmail !== "") ? 'email LIKE ' + "'%" + filterEmail + "%'" : 'TRUE';
    sqlWhere += ' AND ';
    sqlWhere += (filterCargo !== null && filterCargo !== "") ? 'cargo = ' + filterCargo : 'TRUE';
    sqlWhere += ' AND ';
    sqlWhere += ' TRUE )';



    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM colaboradores ' + sqlWhere, [], function(a, result) {
            var rows = result.rows;
            var tr = '';

            for (var i = 0; i < rows.length; i++) {


                var btns =
                    `<td class=" td-default"><a href="#" onclick="editar('${rows[i].id}')" class="btn btn-primary btn-sm" title="Editar"><i class="fas fas fa-edit"></i></a>
                    <a href="#" onclick="deletar('${rows[i].id}')" class="btn btn-danger btn-sm btn-delete" title="Excluir"><i class="fas fa-trash"></i></a></td>
                    <td class=" td-btn-options">
                        <div class="btn-group">
                            <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown">
                                    <i class="fa fa-bars"></i>
                                </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" onclick="editar('${rows[i].id}')" href="#"><i class="fas fas fa-edit"></i> <span style="padding-left: .2em;">Editar</span> </a>
                                <a class="dropdown-item" onclick="deletar('${rows[i].id}')" href="#"><i class="fas fa-trash"></i> <span style="padding-left: .3em;">Excluir</span></a>
                            </div>
                        </div>
                    </td>`;

                tr += `<tr id="${rows[i].id}">`;
                tr += '<td>' + rows[i].nome + '</td>';
                tr += '<td>' + rows[i].idade + '</td>';
                tr += '<td>' + rows[i].email + '</td>';
                tr += btns;
                tr += '</tr>';
            }
            tbody.innerHTML = tr;
            total.innerHTML = rows.length;
        });
    });

}

function popularDados() {
    //limpa a url
    var url = window.location.href.replace(/#/g, '');

    //verifica se a url possui um Id
    if (url.includes('?') && url.split('?')[1].length == 36) {
        var id = window.location.href.split('?')[1];
        db.transaction(function(tx) {
            tx.executeSql("SELECT * FROM colaboradores WHERE id = ?", [id],
                function(_, result) {
                    var colaborador = result.rows[0];

                    //adiciona o valor nos inputs advindos do bdd
                    document.getElementById('id').value = colaborador.id;
                    document.getElementById('nome').value = colaborador.nome;
                    document.getElementById('idade').value = colaborador.idade;
                    document.getElementById('email').value = colaborador.email;
                    document.getElementById('cargo').value = colaborador.cargo;

                    //bloqueia o campo email pois ele não pode ser alterado
                    document.getElementById('email').readOnly = true;
                }
            );
        });

    }
}


function ready() {
    if (document.getElementById('btn-save')) {
        document.getElementById('btn-save').addEventListener('click', salvar);
        popularDados();
    }
    if (document.getElementById('btn-search')) document.getElementById('btn-search').addEventListener('click', buscar);
    criarTabelaColaboradores();

}