import { db } from '../system_utilities/db.js'; //* permite acessar o banco de dados sqlite no próprio navegador


window.addEventListener('load', redy);


function buildNav() {
    // TODO: implementar lógica para diferenciar os tipos de usuários.
    var divNav = document.getElementById('div-nav');
    var nav = '<nav class="navbar navbar-expand-md  navbar-dark" style="background-color:rgb(38 151 64)">\
    <a class="navbar-brand" href="#">Gado de <span style="color:\
                goldenrod;">Ouro</span></a>\
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">\
            <span class="navbar-toggler-icon"></span>\
        </button>\
    <div class="collapse navbar-collapse" id="collapsibleNavbar">\
        <ul class="navbar-nav">\
            <li class="nav-item dropdown">\
                <a class="nav-link dropdown-toggle text-white" href="#" id="navbardrop" data-toggle="dropdown">\
                        Colaborador\
                    </a>\
                <div class="dropdown-menu">\
                    <a class="dropdown-item" href="../colaboradores/cadastro_colaborador.html">Cadastro</a>\
                    <a class="dropdown-item" href="../colaboradores/busca_colaborador.html">Busca</a>\
                </div>\
            </li>\
            <li class="nav-item dropdown">\
                <a class="nav-link dropdown-toggle text-white" href="#" id="navbardrop" data-toggle="dropdown">\
                        Insumos\
                    </a>\
                <div class="dropdown-menu">\
                    <a class="dropdown-item" href="#">Cadastro</a>\
                    <a class="dropdown-item" href="#">Busca</a>\
                    <a class="dropdown-item" href="#">Baixa</a>\
                </div>\
            </li>\
            <li class="nav-item dropdown">\
                <a class="nav-link dropdown-toggle text-white" href="#" id="navbardrop" data-toggle="dropdown">\
                        Animal\
                    </a>\
                <div class="dropdown-menu">\
                    <a class="dropdown-item" href="#">Cadastro</a>\
                    <a class="dropdown-item" href="#">Busca</a>\
                    <a class="dropdown-item" href="#">Baixa</a>\
                </div>\
            </li>\
            <li class="nav-item dropdown">\
                <a class="nav-link dropdown-toggle text-white" href="#" id="navbardrop" data-toggle="dropdown">\
                        Dieta\
                    </a>\
                <div class="dropdown-menu">\
                    <a class="dropdown-item" href="#">Cadastro</a>\
                    <a class="dropdown-item" href="../dieta/buscaDieta.html">Busca</a>\
                    <a class="dropdown-item" href="#">Baixa</a>\
                </div>\
            </li>\
            <li class="nav-item dropdown">\
                <a class="nav-link dropdown-toggle text-white" href="#" id="navbardrop" data-toggle="dropdown">\
                        Exemplos\
                    </a>\
                <div class="dropdown-menu">\
                    <a class="dropdown-item" href="../exemplo/cadastro_insumo.html">Cadastro</a>\
                    <a class="dropdown-item" href="../exemplo/busca_insumo.html"">Busca</a>\
                    <a class="dropdown-item" href="../exemplo/cadastro_dieta.html"">Cadastrar Dieta</a>\
                </div>\
            </li>\
            <li class="nav-item dropdown">\
                <a class="nav-link dropdown-toggle text-white" href="#" id="navbardrop" data-toggle="dropdown">\
                        Relatórios\
                    </a>\
                <div class="dropdown-menu">\
                    <a class="dropdown-item" href="#">Relatório Animal</a>\
                    <a class="dropdown-item" href="../relatorios/relatorio_de_custos.html">Relatório de Custos</a>\
                </div>\
            </li>\
         </ul>\
         <button class="btn my-2 my-sm-0 ml-auto" id="btn-logout" type="button"> <i class="fa fa-share" aria-hidden="true" ></i> Logout</button>\
        </div>\
    </nav>';
    divNav.innerHTML = nav;

}

function checkTypeUser() {
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM usuarios WHERE logado = 1', [], function(tx, result) {
            if (result.rows.length > 0) {
                //var tpUser = result.rows[0].typeUser;
                buildNav();
                document.getElementById('btn-logout').addEventListener('click', logout);
            }
        }, null);
    });
}

function logout() {
    // TODO: colocar modal para confirmar a saida
    console.log('deslogou');
    db.transaction(function(tx) {
        tx.executeSql('UPDATE usuarios SET logado=0 WHERE logado=1', [], null);
        window.location.replace("../../views/shared/login.html");
    });
}

function redy() {
    checkTypeUser();

}