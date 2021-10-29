import { db } from '../system_utilities/db.js';

window.addEventListener('load', redy);

// Cria a tabela de usuários => users
function createTableSupplies() {
    var query = "CREATE TABLE IF NOT EXISTS supplies ( id INTEGER PRIMARY KEY,name TEXT,quantity INTEGER, quantityMin INTEGER)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });
}


function save() {
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var quantity = document.getElementById('quantity').value;
    var quantityMin = document.getElementById('quantityMin').value;

    db.transaction(function(tx) {
        if (id) {
            tx.executeSql('UPDATE supplies SET name=?, quantityMin=? WHERE id=?', [name, quantityMin, id], null);
            swal.fire({
                icon: "success",
                title: "Insumo alterado com sucesso!",
            });
        } else {
            tx.executeSql('INSERT INTO supplies ( name, quantity, quantityMin) VALUES (?, ?, ?)', [name, quantity, quantityMin]);
            swal.fire({
                icon: "success",
                title: "Insumo cadastrado com sucesso!",
            });
        }
    });

    document.getElementById('name').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('quantityMin').value = '';

}


function search() {
    var filterName = document.getElementById('name').value;

    var tbody = document.getElementById('tbody-supplies');
    var total = document.getElementById('total');
    var table = document.getElementById('table-response');
    table.style.display = 'block';

    var sqlWhere = 'WHERE TRUE AND (';
    sqlWhere += (filterName !== null && filterName !== "") ? 'name LIKE ' + "'%" + filterName + "%'" : 'TRUE';
    sqlWhere += ')';



    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM supplies ' + sqlWhere, [], function(a, result) {
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
                if (rows[i].quantity > rows[i].quantityMin) {
                    console.log('é maior');
                }
                tr += rows[i].quantity < rows[i].quantityMin ? '<tr class="table-danger">' : '<tr>';
                tr += '<td>' + rows[i].name + '</td>';
                tr += '<td>' + rows[i].quantity + '</td>';
                tr += '<td>' + rows[i].quantityMin + '</td>';
                tr += btns;
                tr += '</tr>';
            }
            tbody.innerHTML = tr;
            total.innerHTML = rows.length;


        });
    });

}

function createSelectUser() {

    //Pega a div onde vai ser inserido o select pelo ID
    var divSelect = document.getElementById('select-user');


    db.transaction(function(tx) {
        //Busca os valores Banco de dados 
        tx.executeSql('SELECT * FROM users ', [], function(a, result) {
            var rows = result.rows;
            // Inicia a string com valores necessários para montar o select
            var options = ' <label>Usuários</label>\
                            <select class="form-control" id="user" name="user">\
                            <option></option>';





            // Insere cada usuario do banco de dados como uma opção no select
            for (var i = 0; i < rows.length; i++) {
                options += `<option>${rows[i].name}</option>`;
            }

            // Finaliza a string necessaria para montar o select
            options += '</select>';

            // Insere o select montado na div
            divSelect.innerHTML = options;


        });
    });

}



function redy() {
    if (document.getElementById('btn-save')) {
        document.getElementById('btn-save').addEventListener('click', save);
        createSelectUser();
    }
    if (document.getElementById('btn-search')) document.getElementById('btn-search').addEventListener('click', search);
    createTableSupplies();

}