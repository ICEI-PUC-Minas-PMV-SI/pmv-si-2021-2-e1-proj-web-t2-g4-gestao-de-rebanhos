var db = openDatabase("dbGado", "1.0", "DB Gado De Ouro", 2 * 1024 * 1024);


window.addEventListener('load', ready);

function criarTabelaCompras() {
    var query = "CREATE TABLE IF NOT EXISTS compras (id varchar NOT NULL, nf varchar, fornecedor varchar, totalCompra REAL)";
    var queryInsumos = "CREATE TABLE IF NOT EXISTS comprasinsumos (id INTEGER PRIMARY KEY, idCompra varchar , idInsumo varchar, qtdInsumos real, precoUn real)"
    db.transaction(function(tx) {
        tx.executeSql(query);
        tx.executeSql(queryInsumos);
    });
}


function getInsumos(callback) {
    db.transaction(function(tx) {
        tx.executeSql('SELECT id,name FROM insumos ORDER BY name', [],
            function(tx, resultado) {
                callback(resultado);
            },
            function(tx, erro) {
                console.log("erro ao executar");
                console.log(erro);
            })
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

function save() {
    //gera um id unico
    console.log("chamou save");
    var newId = generateUUID();
    var nf = document.getElementById('nf').value;
    var quantidade = document.getElementById('Quantidadeinsumos').value;
    var fornecedor = document.getElementById('fornecedor').value;
    var totalCompra = document.getElementById('total').value;
    var dados = [newId, nf, fornecedor, totalCompra];
    var id = document.getElementById('id').value;

    var validacao = true;
    var msgHtml = '';


    if (nf.length <= 0) {
        validacao = false;
        msgHtml += '<p> - O campo <b>Nota Fiscal</b> é obrigatório.</p>';
    }
    if (fornecedor.length <= 0) {
        validacao = false;
        msgHtml += '<p> - O campo <b>Fornecedor</b> é obrigatório.</p>';
    }
    if (quantidade.length <= 0) {
        validacao = false;
        msgHtml += '<p> - O campo <b>Quantidade Insumos</b> é obrigatório.</p>';
    }



    if (validacao == true) {
        db.transaction(function(tx) {
            if (id) {
                tx.executeSql('UPDATE compras SET nf=? WHERE id=?', [nf, id],
                    //*callback sucesso
                    function() {
                        swal.fire({
                            icon: "success",
                            title: "compras alterada com sucesso!",
                        });
                    },
                    //*callback falha
                    function() {
                        swal.fire({
                            icon: "error",
                            title: "Falha em alterar a dieta.",
                        });
                    }
                );
                tx.executeSql('UPDATE dietaInsumos SET nomeInsumo=?, qtdInsumos=?, duracao=? WHERE idDieta=?', [nomeInsumo, qtdInsumos, duracao, id],
                    //*callback sucesso
                    function() {
                        swal.fire({
                            icon: "success",
                            title: "Insumo alterado com sucesso!",
                        });
                    },
                    //*callback falha
                    function() {
                        swal.fire({
                            icon: "error",
                            title: "Falha em alterar o insumo.",
                        });
                    }
                );

            } else {

                tx.executeSql('INSERT INTO compras (id, nf, fornecedor, totalCompra) VALUES (?, ?,?, ?)', dados,
                    //callback sucesso
                    function() {
                        console.log("entrou na função");
                        for (var i = 0; i < quantidade; i++) {
                            var idInsumo = document.getElementById('supplyname' + i).value;
                            var qtdInsumos = document.getElementById('quantity' + i).value;
                            var preco = document.getElementById('preco' + i).value;
                            dados = [newId, idInsumo, qtdInsumos, preco];

                            if (idInsumo.length <= 0) {
                                validacao = false;
                                msgHtml += '<p> - O campo <b>nome Insumo</b> é obrigatório.</p>';
                            }
                            if (qtdInsumos.length <= 0) {
                                validacao = false;
                                msgHtml += '<p> - O campo <b>quantidade</b> é obrigatório.</p>';
                            }
                            if (preco.length <= 0) {
                                validacao = false;
                                msgHtml += '<p> - O campo <b>Preço</b> é obrigatório.</p>';
                            }
                            if (validacao == true) {
                                tx.executeSql('UPDATE insumos set qtd = qtd + ? WHERE id=?', [qtdInsumos, idInsumo]);
                                tx.executeSql('INSERT INTO comprasinsumos (idCompra, idInsumo, qtdInsumos, precoUn) VALUES (?,?,?,?)', dados,
                                    //callback sucesso
                                    function(tx, msg) {
                                        Swal.fire({
                                            title: 'Insumo alterado com sucesso!',
                                            icon: "success",

                                        }).then((result) => {
                                            /* Read more about isConfirmed, isDenied below */
                                            if (result) {
                                                window.location.reload()
                                            }
                                        });
                                    },
                                    function(tx, erro) {
                                        console.log("valores não inseridos");
                                        console.log(erro);
                                    }
                                );
                            } else {
                                swal.fire({
                                    icon: "error",
                                    title: "Preencha os campos corretamente.",
                                    html: msgHtml
                                });
                            }

                        }
                    }
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




function calcSubtotal(i) {
    //quantity - preco - subtotal

    var qtd = document.getElementById("quantity" + i).value;
    var preco = document.getElementById("preco" + i).value;
    var subtotal = document.getElementById("subtotal" + i);
    //var total = document.getElementById("total");

    if (qtd.length > 0 && preco.length > 0) {
        subtotal.value = preco * qtd;
        calcTotal();
    }
}

function calcTotal() {
    //Quantidadeinsumos
    var qtdInsumos = document.getElementById("Quantidadeinsumos").value;
    var total = document.getElementById("total");
    var soma = 0;
    for (var i = 0; i < qtdInsumos; i++) {
        var subtotal = document.getElementById("subtotal" + i).value;
        if (subtotal.length > 0) {
            soma += parseFloat(subtotal);
        }
    }
    total.value = soma;
}

function ready() {
    criarTabelaCompras();
}