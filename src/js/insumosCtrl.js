import { db } from '../system_utilities/db.js';

window.addEventListener('load', redy);

// Cria a tabela de usuários => users
function createTableInsumos() {
    var query = "CREATE TABLE IF NOT EXISTS insumos ( id INTEGER PRIMARY KEY,name TEXT, frabricante text, qty INTEGER, validade DATE, lote TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
    });
}


function save() {
    var id = document.getElementById('id').value;
    var name = document.getElementById('name').value;
    var frabricante = document.getElementById('fabricante').value;
    var qty = document.getElementById('qty').value;
    var validade = document.getElementById('validade').value;
    var lote = document.getElementById('lote').value;


    db.transaction(function(tx) {
        if (id) {
            tx.executeSql('UPDATE insumos SET nome=?, fabricante=?, qty=?, validade=?, lote=? WHERE id=?', [name, fabricante, qty, validade, lote, id], null);
            swal.fire({
                icon: "success",
                title: "Insumo alterado com sucesso!",
            });
        } else {
            tx.executeSql('INSERT INTO Insumo ( name, fabricante, qty, validade, lote) VALUES (?, ?, ?, ?, ?)', [name, fabricante, qty, validade, lote]);
            swal.fire({
                icon: "success",
                title: "Insumo cadastrado com sucesso!",
            });
        }
    });

    document.getElementById('name').value = '';
    document.getElementById('fabricante')
    document.getElementById('qty').value = '';
    document.getElementById('validade').value = '';
    document.getElementById('lote').value = '';

}


function search() {
    var filterNome = document.getElementById('name').value;

    var tbody = document.getElementById('tbody-insumos');
    var total = document.getElementById('total');
    var table = document.getElementById('table-response');
    table.style.display = 'block';

    var sqlWhere = 'WHERE TRUE AND (';
    sqlWhere += (filterName !== null && filterName !== "") ? 'name LIKE ' + "'%" + filterName + "%'" : 'TRUE';
    sqlWhere += ')';



    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM insumos ' + sqlWhere, [], function(a, result) {
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
                tr += '<td>' + rows[i].frabricante + '</td>';
                tr += '<td>' + rows[i].qty + '</td>';
                tr += '<td>' + rows[i].validade + '</td>';
                tr += '<td>' + rows[i].lote + '</td>';
                tr += btns;
                tr += '</tr>';
            }
            tbody.innerHTML = tr;
            total.innerHTML = rows.length;


        });
    });

}


