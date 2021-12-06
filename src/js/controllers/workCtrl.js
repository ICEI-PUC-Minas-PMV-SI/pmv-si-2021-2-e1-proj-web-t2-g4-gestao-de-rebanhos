//import { db } from '../system_utilities/db.js'; // permite acessar o banco de dados sqlite no próprio navegador
var db = openDatabase("dbGado", "1.0", "DB Gado De Ouro", 2 * 1024 * 1024);



window.addEventListener('load', redy);

function criarTabelas() {
    criarTabelaInsumos();
    criarTabelaBaixaInsumos();

    criarTabelaDietaseInsumos();

    criarTabelaColaboradores();

    createTableAnimals()
    criarTabelaBaixaAnimal()
    criarTabelaPesagemAnimal()



}

//* ====================================== Insumos ========================================

function criarTabelaInsumos() {
    var query = "CREATE TABLE IF NOT EXISTS insumos ( id INTEGER PRIMARY KEY,name TEXT NOT NULL UNIQUE, qtd REAL NOT NULL, qtdMin REAL NOT NULL)";
    db.transaction(function(tx) {
        tx.executeSql(query);
        tx.executeSql(' SELECT COUNT(*) FROM insumos', [],
            function(_, result) {
                var count = result.rows[0]['COUNT(*)'];
                if (count == 0) {
                    //* Função utilizada para criar dados fictícios com a intensão de povoar as tabelas do bdd, afim de realizar testes e demostrações.
                    inserirDadosInsumos();
                }
            }
        );
    });
}

//Cria a tabela de baixa de insumos
function criarTabelaBaixaInsumos() {
    var query = "CREATE TABLE IF NOT EXISTS baixaInsumo (id INTEGER PRIMARY KEY, name TEXT NOT NULL, idInsumo INTEGER, qtdSaida REAL NOT NULL, motivo TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
        tx.executeSql(' SELECT COUNT(*) FROM baixaInsumo', [],
            function(_, result) {
                var count = result.rows[0]['COUNT(*)'];
                if (count == 0) {
                    //* Função utilizada para criar dados fictícios com a intensão de povoar as tabelas do bdd, afim de realizar testes e demostrações.
                    inserirDadosBaixaInsumos();
                }
            }
        );
    });
}


function inserirDadosInsumos() {
    db.transaction(function(tx) {
        var insumos = [
            "INSERT INTO insumos (name, qtd, qtdMin) VALUES ('Farelo de Milho', 5000, 300 )",
            "INSERT INTO insumos (name, qtd, qtdMin) VALUES ('Farelo de Soja', 2322, 715 )",
            "INSERT INTO insumos (name, qtd, qtdMin) VALUES ('Ração Boi Forte', 73826, 7000 )",
            "INSERT INTO insumos (name, qtd, qtdMin) VALUES ('Sal', 321, 1200 )"
        ];

        for (let insumo of insumos) {
            tx.executeSql(insumo);
        }

    });
}

function inserirDadosBaixaInsumos() {
    db.transaction(function(tx) {
        var baixas = [
            "INSERT INTO baixaInsumo (idInsumo, name, qtdSaida, motivo ) VALUES (1, 'Farelo de Milho', 200, 'Uso Padrão')",
            "INSERT INTO baixaInsumo (idInsumo, name, qtdSaida, motivo ) VALUES (1, 'Farelo de Milho', 482, 'Uso Padrão')",
            "INSERT INTO baixaInsumo (idInsumo, name, qtdSaida, motivo ) VALUES (1, 'Farelo de Milho', 115, 'Uso Padrão')"
        ];

        for (let baixa of baixas) {
            tx.executeSql(baixa);
        }

    });
}

//* ====================================== /Insumos ========================================



//* ====================================== Dietas ========================================

function criarTabelaDietaseInsumos() {
    var query = "CREATE TABLE IF NOT EXISTS dietas (id varchar,nome varchar UNIQUE)";
    var queryInsumos = "CREATE TABLE IF NOT EXISTS dietaInsumos (id INTEGER PRIMARY KEY, idDieta varchar , nomeInsumo varchar, qtdInsumos real, duracao integer)"
    db.transaction(function(tx) {
        tx.executeSql(query);
        tx.executeSql(queryInsumos);
        tx.executeSql(' SELECT COUNT(*) FROM dietas', [],
            function(_, result) {
                var count = result.rows[0]['COUNT(*)'];
                if (count == 0) {
                    //* Função utilizada para criar dados fictícios com a intensão de povoar as tabelas do bdd, afim de realizar testes e demostrações.
                    inserirDadosDieta();
                }
            }
        );
    });
}

function inserirDadosDieta() {

    db.transaction(function(tx) {
        var dietas = [
            "INSERT INTO dietas (id, nome) VALUES ('68bd5620-d00f-4643-aa66-3d10e5524994', 'Dieta 1')",
            "INSERT INTO dietas (id, nome) VALUES ('bbe4367f-a1af-4ec5-8bfc-740f82c62020', 'Dieta 2')"
        ];
        var insumosDieta = [
            "INSERT INTO dietaInsumos (idDieta, nomeInsumo, qtdInsumos, duracao) VALUES ('68bd5620-d00f-4643-aa66-3d10e5524994','Farelo de Milho',150,10)",
            "INSERT INTO dietaInsumos (idDieta, nomeInsumo, qtdInsumos, duracao) VALUES ('68bd5620-d00f-4643-aa66-3d10e5524994','Farelo de Soja',220,10)",
            "INSERT INTO dietaInsumos (idDieta, nomeInsumo, qtdInsumos, duracao) VALUES ('68bd5620-d00f-4643-aa66-3d10e5524994','Ração Boi Forte',1150,10)",
            "INSERT INTO dietaInsumos (idDieta, nomeInsumo, qtdInsumos, duracao) VALUES ('bbe4367f-a1af-4ec5-8bfc-740f82c62020','Sal',600,15)",
            "INSERT INTO dietaInsumos (idDieta, nomeInsumo, qtdInsumos, duracao) VALUES ('bbe4367f-a1af-4ec5-8bfc-740f82c62020','Ração Boi Forte',2450,15)"
        ];

        for (let dieta of dietas) {
            tx.executeSql(dieta);
        }

        for (let insumo of insumosDieta) {
            tx.executeSql(insumo);
        }

    });

}

//* ====================================== /Dietas ========================================




//* ====================================== Colaboradores ========================================


function criarTabelaColaboradores() {
    var query = "CREATE TABLE IF NOT EXISTS colaboradores ( id TEXT PRIMARY KEY, nome TEXT NOT NULL, idade INTEGER NOT NULL, email TEXT NOT NULL UNIQUE, cargo INTEGER NOT NULL)";
    db.transaction(function(tx) {
        tx.executeSql(query);
        tx.executeSql(' SELECT COUNT(*) FROM colaboradores', [],
            function(_, result) {
                var count = result.rows[0]['COUNT(*)'];
                if (count == 0) {
                    //* Função utilizada para criar dados fictícios com a intensão de povoar as tabelas do bdd, afim de realizar testes e demostrações.
                    iserirDadosColab();
                }
            }
        );
    });
}

function iserirDadosColab() {
    db.transaction(function(tx) {
        //* query operador 01
        var queryColab = "INSERT INTO colaboradores (id, nome, idade, email, cargo) VALUES ('99790135-49d1-4ed6-8890-9f9ea985c96a', 'op01', 26, 'op1@email.com', 3);";
        var queryUser = "INSERT INTO usuarios ( nome, senha, email, tipoUsuario, logado, idColaborador) VALUES ('op01', '123456', 'op1@email.com', 3, 0, '99790135-49d1-4ed6-8890-9f9ea985c96a')";
        tx.executeSql(queryColab);
        tx.executeSql(queryUser);

        //* query vet 01
        var queryVet = "INSERT INTO colaboradores (id, nome, idade, email, cargo) VALUES ('59a29eef-7e8d-4db0-80f4-5737cd4a65fa', 'vet01', 44, 'vet1@email.com', 2);";
        var queryUserVet = "INSERT INTO usuarios ( nome, senha, email, tipoUsuario, logado, idColaborador) VALUES ('vet01', '123456', 'vet1@email.com', 2, 0, '59a29eef-7e8d-4db0-80f4-5737cd4a65fa')";
        tx.executeSql(queryVet);
        tx.executeSql(queryUserVet);
    });
}


//* ====================================== /Colaboradores ========================================

//* ====================================== Animais ========================================
function createTableAnimals() {
    var query = "CREATE TABLE IF NOT EXISTS animais (id INTEGER PRIMARY KEY, tag TEXT NOT NULL, raca TEXT NOT NULL,idade INTEGER NOT NULL,sexo TEXT NOT NULL,peso REAL NOT NULL,idDieta TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
        //* Verifica tabela de animais
        tx.executeSql(' SELECT COUNT(*) FROM animais', [],
            function(_, result) {
                var count = result.rows[0]['COUNT(*)'];
                if (count == 0) {
                    //* Função utilizada para criar dados fictícios com a intensão de povoar as tabelas do bdd, afim de realizar testes e demostrações.
                    iserirDadosAnimal();
                }
            }
        );

    });

}

function criarTabelaBaixaAnimal() {
    var query = "CREATE TABLE IF NOT EXISTS baixaanimal (id INTEGER PRIMARY KEY, tag TEXT NOT NULL, raca TEXT NOT NULL,idade INTEGER NOT NULL, peso REAL NOT NULL, motivo TEXT)";
    db.transaction(function(tx) {
        tx.executeSql(query);
        //* Verifica tabela de  baixa animais
        tx.executeSql(' SELECT COUNT(*) FROM baixaanimal', [],
            function(_, result) {
                var count = result.rows[0]['COUNT(*)'];
                if (count == 0) {
                    //* Função utilizada para criar dados fictícios com a intensão de povoar as tabelas do bdd, afim de realizar testes e demostrações.
                    iserirDadosBaixaAnimal();
                }
            }
        );
    });

}

function criarTabelaPesagemAnimal() {
    var query = "CREATE TABLE IF NOT EXISTS pesagemanimal (id INTEGER PRIMARY KEY, idAnimal INTEGER, tag TEXT NOT NULL, peso REAL NOT NULL, dtPesagem TEXT )";
    db.transaction(function(tx) {
        tx.executeSql(query);
        //* Verifica tabela de  pesagem animais
        tx.executeSql(' SELECT COUNT(*) FROM pesagemanimal', [],
            function(_, result) {
                var count = result.rows[0]['COUNT(*)'];
                if (count == 0) {
                    //* Função utilizada para criar dados fictícios com a intensão de povoar as tabelas do bdd, afim de realizar testes e demostrações.
                    iserirDadosPesoAnimal();
                }
            }
        );
    });

}

function iserirDadosAnimal() {
    db.transaction(function(tx) {
        var animais = [
            "INSERT INTO animais (tag, raca, idade, sexo, peso) VALUES ('0001', 'Indubrasil', 26, 'Macho', 498)",
            "INSERT INTO animais (tag, raca, idade, sexo, peso) VALUES ('0002', 'Nelore', 18, 'Macho', 130)",
            "INSERT INTO animais (tag, raca, idade, sexo, peso) VALUES ('0003', 'Pantaneiro', 25, 'Fêmea', 200)"
        ];

        for (let animal of animais) {
            tx.executeSql(animal);
        }

    });
}

function iserirDadosBaixaAnimal() {
    db.transaction(function(tx) {
        var baixas = [
            "INSERT INTO baixaanimal (tag, raca, idade, peso, motivo ) VALUES ('639', 'Indubrasil', 22, 430, 'abate')",
            "INSERT INTO baixaanimal (tag, raca, idade, peso, motivo ) VALUES ('756', 'Pantaneiro', 22, 523, 'venda')",
            "INSERT INTO baixaanimal (tag, raca, idade, peso, motivo ) VALUES ('214', 'Nelore', 06, 105, 'acidente')",
        ];

        for (let baixa of baixas) {
            tx.executeSql(baixa);
        }

    });
}

function iserirDadosPesoAnimal() {
    db.transaction(function(tx) {
        var pesagens = [
            "INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (1, 0001, 206, '2021-10-01')",
            "INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (1, 0001, 227, '2021-10-10')",
            "INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (1, 0001, 231, '2021-10-15')",
            "INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (1, 0001, 265, '2021-10-25')",
            "INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (1, 0001, 304, '2021-11-01')",
            "INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (1, 0001, 327, '2021-11-05')",
            "INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (1, 0001, 361, '2021-11-10')",
            "INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (1, 0001, 415, '2021-11-20')",
            "INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (1, 0001, 442, '2021-11-25')",
            "INSERT INTO pesagemanimal (idAnimal, tag, peso, dtPesagem ) VALUES (1, 0001, 498, '2021-11-30')",
        ];

        for (let pesagem of pesagens) {
            tx.executeSql(pesagem);
        }

    });
}
//* ====================================== /Animais ========================================





function setBtns() {
    db.transaction(function(tx) {
        tx.executeSql('SELECT * FROM usuarios WHERE logado = 1', [], function(tx, result) {
            var tipoUsuario = result.rows[0].tipoUsuario;

            switch (tipoUsuario) {
                case 2:
                    document.getElementById('cadastro-colaboradores').style.display = "none";
                    break;
                case 3 || 4 || 5:
                    document.getElementById('cadastro-colaboradores').style.display = "none";
                    document.getElementById('cadastro-dietas').style.display = "none";
                    break;
            }

        }, null);
    });
}

function buildSvgsCadastros() {

    //build svg cadastro gado
    document.getElementById("svg-gado").innerHTML = ` 
        <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
            <path class="svg-work" d="M29,18.3c0-2.6-1.4-4.9-3.6-6.1C26.9,10.2,28,7.8,28,5c0-1,0-2-0.5-3c0,0,0,0.1,0,0.1C26.3,6.9,21.9,10,16.9,10
                h-1.8c-5,0-9.5-3.1-10.6-7.9c0,0,0-0.1,0-0.1C4,3,4,4,4,5c0,2.8,1.1,5.2,2.6,7.3C4.4,13.5,3,15.7,3,18.3c1.6,0,3.1-0.6,4.3-1.5
                l1.1,9c0.3,2.4,2.3,4.1,4.7,4.1h5.8c2.4,0,4.4-1.8,4.7-4.1l1.1-9C25.9,17.8,27.4,18.3,29,18.3z"/>
            <line class="svg-work" x1="9" y1="24" x2="23" y2="24"/>
        </svg>
    `;

    // Build svg cadastro insumos
    document.getElementById("svg-insumos").innerHTML = ` 
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40.82 41.81"><defs>
            </defs><title>Asset 4</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_2-2" data-name="Layer 2"><rect class="svg-work" x="1.59" y="8.82" width="36.8" height="5.81" rx="2.62"/>
            <path class="svg-work" d="M2.76,34.46A9.13,9.13,0,0,1,1.7,28L4.5,14.63"/><path class="svg-work" d="M20.41,39H8.47c-.24,0-.48,0-.72,0"/><path class="svg-work" d="M3.59,34.28S1,35.71,1,37.66c0,2.56,4.72,5.92,8.09-.77"/>
            <path class="svg-work" d="M20.41,39H32.35c.24,0,.48,0,.72,0"/>
            <path class="svg-work" d="M37.23,34.28s2.57,1.43,2.59,3.38c0,2.56-4.72,5.92-8.08-.77"/>
            <path class="svg-work" d="M38.06,34.46A9.08,9.08,0,0,0,39.12,28l-2.8-13.32"/>
            <path class="svg-work" d="M11.8,27.63a3.9,3.9,0,0,0,5.52-5.52C16,20.8,11.29,20.17,10,20a.26.26,0,0,0-.28.29C9.86,21.59,10.49,26.32,11.8,27.63Z"/>
            <line class="svg-work" x1="13.11" y1="23.5" x2="19.34" y2="29.73"/>
            <path class="svg-work" d="M21.54,20.64A5.25,5.25,0,0,0,29,28.07c1.76-1.77,2.6-8.12,2.8-9.85a.34.34,0,0,0-.38-.38C29.66,18,23.31,18.87,21.54,20.64Z"/>
            <line class="svg-work" x1="27.09" y1="22.4" x2="19.34" y2="29.73"/><line class="svg-work" x1="19.54" y1="34.88" x2="19.54" y2="29.88"/>
            <path class="svg-work" d="M7,8.82l6.46-5.45A10.14,10.14,0,0,1,27,3.82L32,8.73"/></g></g>
        </svg>
    `;

    // Build svg cadastro dietas
    document.getElementById("svg-dietas").innerHTML = ` 
        <svg  viewBox="0 0 64 64"  xmlns="http://www.w3.org/2000/svg">
            <path class="svg-work" d="M48 3H16C14.6739 3 13.4021 3.52678 12.4645 4.46447C11.5268 5.40215 11 6.67392 11 8V56C11 57.3261 11.5268 58.5979 12.4645 59.5355C13.4021 60.4732 14.6739 61 16 61H48C49.3261 61 50.5979 60.4732 51.5355 59.5355C52.4732 58.5979 53 57.3261 53 56V8C53 6.67392 52.4732 5.40215 51.5355 4.46447C50.5979 3.52678 49.3261 3 48 3V3ZM51 56C51 56.7956 50.6839 57.5587 50.1213 58.1213C49.5587 58.6839 48.7956 59 48 59H16C15.2044 59 14.4413 58.6839 13.8787 58.1213C13.3161 57.5587 13 56.7956 13 56V8C13 7.20435 13.3161 6.44129 13.8787 5.87868C14.4413 5.31607 15.2044 5 16 5H48C48.7956 5 49.5587 5.31607 50.1213 5.87868C50.6839 6.44129 51 7.20435 51 8V56Z" />
            <path class="svg-work" d="M48 7.60999H16C15.7348 7.60999 15.4804 7.71534 15.2929 7.90288C15.1054 8.09041 15 8.34477 15 8.60998V53.61C15 53.8752 15.1054 54.1296 15.2929 54.3171C15.4804 54.5046 15.7348 54.61 16 54.61H48C48.2652 54.61 48.5196 54.5046 48.7071 54.3171C48.8946 54.1296 49 53.8752 49 53.61V8.60998C49 8.34477 48.8946 8.09041 48.7071 7.90288C48.5196 7.71534 48.2652 7.60999 48 7.60999V7.60999ZM47 52.61H17V9.60998H47V52.61Z" />
            <path class="svg-work" d="M28.16 30.27C28.8923 30.8271 29.7803 31.1417 30.7 31.17C31.1462 31.1697 31.588 31.0814 32 30.91C32.412 31.0814 32.8537 31.1697 33.3 31.17C34.2197 31.1417 35.1076 30.8271 35.84 30.27C38.0471 28.4993 39.5274 25.9799 40 23.19C40.55 19.49 38.34 15.96 35.07 15.31C34.4904 15.1936 33.8952 15.1767 33.31 15.26C33.5518 14.7715 33.9252 14.3601 34.388 14.0722C34.8509 13.7842 35.3849 13.6311 35.93 13.63C36.1952 13.63 36.4495 13.5246 36.6371 13.3371C36.8246 13.1496 36.93 12.8952 36.93 12.63C36.93 12.3648 36.8246 12.1104 36.6371 11.9229C36.4495 11.7354 36.1952 11.63 35.93 11.63C34.8328 11.6309 33.7675 11.9984 32.9032 12.6743C32.0389 13.3501 31.4253 14.2954 31.16 15.36C30.4185 15.1999 29.6514 15.1999 28.91 15.36C25.64 16.01 23.43 19.54 23.98 23.24C24.4692 26.0147 25.9558 28.5149 28.16 30.27V30.27ZM29.31 17.27C30.0713 17.1202 30.861 17.233 31.55 17.59C31.6925 17.6494 31.8455 17.68 32 17.68C32.1544 17.68 32.3074 17.6494 32.45 17.59C33.1423 17.2323 33.9353 17.1195 34.7 17.27C36.93 17.72 38.43 20.27 38.04 22.9C37.6349 25.1484 36.4484 27.1814 34.69 28.64C34.4619 28.8319 34.197 28.9753 33.9115 29.0613C33.6261 29.1472 33.3261 29.174 33.03 29.14C32.7189 28.9531 32.3628 28.8544 32 28.8544C31.6371 28.8544 31.281 28.9531 30.97 29.14C30.6738 29.1746 30.3736 29.1481 30.0881 29.0621C29.8026 28.9761 29.5377 28.8324 29.31 28.64C27.5697 27.1723 26.3986 25.1414 26 22.9C25.57 20.24 27.07 17.72 29.31 17.27Z" />
            <path class="svg-work" d="M23.06 39.45C23.2474 39.6363 23.5008 39.7408 23.765 39.7408C24.0292 39.7408 24.2826 39.6363 24.47 39.45L28.54 35.38C28.6337 35.287 28.7081 35.1764 28.7589 35.0546C28.8096 34.9327 28.8358 34.802 28.8358 34.67C28.8358 34.538 28.8096 34.4073 28.7589 34.2854C28.7081 34.1636 28.6337 34.053 28.54 33.96C28.3526 33.7738 28.0992 33.6692 27.835 33.6692C27.5708 33.6692 27.3174 33.7738 27.13 33.96L23.77 37.33L22.67 36.24C22.4787 36.0762 22.2326 35.9906 21.9809 36.0003C21.7293 36.01 21.4905 36.1144 21.3124 36.2924C21.1343 36.4705 21.03 36.7093 21.0203 36.961C21.0106 37.2126 21.0962 37.4587 21.26 37.65L23.06 39.45Z" />
            <path class="svg-work" d="M29.21 37.21C29.21 37.4752 29.3153 37.7296 29.5029 37.9171C29.6904 38.1046 29.9447 38.21 30.21 38.21H42.64C42.9052 38.21 43.1595 38.1046 43.3471 37.9171C43.5346 37.7296 43.64 37.4752 43.64 37.21C43.64 36.9448 43.5346 36.6904 43.3471 36.5029C43.1595 36.3153 42.9052 36.21 42.64 36.21H30.21C29.9447 36.21 29.6904 36.3153 29.5029 36.5029C29.3153 36.6904 29.21 36.9448 29.21 37.21Z" />
            <path class="svg-work" d="M23.0599 47.06C23.1533 47.1527 23.2642 47.226 23.386 47.2758C23.5078 47.3255 23.6383 47.3508 23.7699 47.35C24.0323 47.3489 24.2836 47.2448 24.4699 47.06L28.5399 43C28.6336 42.907 28.708 42.7964 28.7588 42.6746C28.8096 42.5527 28.8357 42.422 28.8357 42.29C28.8357 42.158 28.8096 42.0273 28.7588 41.9054C28.708 41.7836 28.6336 41.673 28.5399 41.58C28.3525 41.3938 28.0991 41.2892 27.8349 41.2892C27.5707 41.2892 27.3173 41.3938 27.1299 41.58L23.7699 44.95L22.6699 43.85C22.4825 43.6638 22.2291 43.5592 21.9649 43.5592C21.7007 43.5592 21.4473 43.6638 21.2599 43.85C21.1662 43.943 21.0918 44.0536 21.041 44.1754C20.9903 44.2973 20.9641 44.428 20.9641 44.56C20.9641 44.692 20.9903 44.8227 21.041 44.9446C21.0918 45.0664 21.1662 45.177 21.2599 45.27L23.0599 47.06Z" />
            <path class="svg-work" d="M42.64 43.82H30.21C29.9447 43.82 29.6904 43.9254 29.5029 44.1129C29.3153 44.3004 29.21 44.5548 29.21 44.82C29.21 45.0852 29.3153 45.3396 29.5029 45.5271C29.6904 45.7147 29.9447 45.82 30.21 45.82H42.64C42.9052 45.82 43.1595 45.7147 43.3471 45.5271C43.5346 45.3396 43.64 45.0852 43.64 44.82C43.64 44.5548 43.5346 44.3004 43.3471 44.1129C43.1595 43.9254 42.9052 43.82 42.64 43.82Z" />
        </svg>
    `;

}


function redy() {

    buildSvgsCadastros();
    setBtns();
    criarTabelas();
}