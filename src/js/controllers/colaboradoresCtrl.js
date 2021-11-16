import { db } from '../system_utilities/db.js'; // permite acessar o banco de dados sqlite no próprio navegador

window.addEventListener('load', redy);



// CRIA TABELA DE COLABORADOES NO BANCO DE DADOS
function criarTabelaColaboradores() {
    var query = "CREATE TABLE IF NOT EXISTS colaboradores ( id INTEGER PRIMARY KEY,nome TEXT,idade INTEGER, email TEXT, cargo INTEGER)";
    db.transaction(function(tx) {
        tx.executeSql(query);
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

    db.transaction(function(tx) {
        if (id) {
            tx.executeSql('UPDATE colaboradores SET nome=?, idade=? WHERE id=?', [nome, idade, id],
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

            var arr = [nome, idade, email, cargo];
            tx.executeSql('INSERT INTO colaboradores ( nome, idade, email, cargo) VALUES (?, ?, ?, ?); ', arr,
                //* callback sucesso
                function() {
                    tx.executeSql('INSERT INTO usuarios ( nome, senha, email, tipoUsuario, logado) VALUES (?, "123456", ?, ?, 0)', [nome, email, cargo],
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
}

function buscar() {
    var filterName = document.getElementById('nome').value;

    var tbody = document.getElementById('tbody-colaboradores');
    var total = document.getElementById('total');
    var table = document.getElementById('table-response');
    table.style.display = 'block';

    var sqlWhere = 'WHERE TRUE AND (';
    sqlWhere += (filterName !== null && filterName !== "") ? 'nome LIKE ' + "'%" + filterName + "%'" : 'TRUE';
    sqlWhere += ')';



    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM colaboradores ' + sqlWhere, [], function(a, result) {
            var rows = result.rows;
            var tr = '';
            var btns = '<td class=" td-default"><a href="#" class="btn btn-primary btn-sm" title="Editar"><i class="fas fas fa-edit"></i></a><a href="#" class="btn btn-danger btn-sm btn-delete" title="Excluir"><i class="fas fa-trash"></i></a></td>\
            <td class=" td-btn-options">\
                <div class="btn-group">\
                    <button type="button" class="btn btn-primary dropdown-toggle btn-sm" data-toggle="dropdown">\
                            <i class="fa fa-bars"></i>\
                        </button>\
                    <div class="dropdown-menu">\
                        <a class="dropdown-item" href="#"><i class="fas fas fa-edit"></i> <span style="padding-left: .2em;">Ver</span> </a>\
                        <a class="dropdown-item" href="#"><i class="fas fa-trash"></i> <span style="padding-left: .3em;">Excluir</span></a>\
                    </div>\
                </div>\
            </td>';

            for (var i = 0; i < rows.length; i++) {

                tr += '<tr>';
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


function redy() {
    if (document.getElementById('btn-save')) {
        document.getElementById('btn-save').addEventListener('click', salvar);
    }
    if (document.getElementById('btn-search')) document.getElementById('btn-search').addEventListener('click', buscar);
    criarTabelaColaboradores();

}