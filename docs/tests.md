# Plano de Testes de Software


# 1.Requisitos a Testar 
*Detalhamento da abordagem de teste:*    
  
A lista abaixo identifica os itens (casos de uso, requisitos funcionais e não funcionais) que foram identificados como alvos de teste. Essa lista representa o que será testado. <image src="img/plano 001.jpg"></image> 
<image src="img/plano 002.jpg"></image>   
# 2.Ferramentas de Teste
  
  As seguintes ferramentas serão empregadas neste projeto de testes:
  
•	VSCode (Editor de Código).  
•	HTML5, CSS e JavaScript (Tecnologias).  


# 3.Ambiente de Teste 
*Definições do Ambiente de Teste:* 

• Teremos testes unitários desenvolvidos individualmente por desenvolvedores de cada pagina, com um volume pequeno de dados.  
• Teremos testes em toda a aplicação com os desenvolvedores de cada pagina com um volume grande de dados pequenos, serão utilizados dados reais ou criados na hora, também teremos testes de aceitação com toda a aplicação ,de testadores e diferentes perfis usuários com um volume pequeno de dados reais ou fictícios.  
• O sistema deverá ser desenvolvido com html, css, javascript.



# 4.Programação dos Testes 
*Objetivos e Prioridades:*
  
• O sistema deve possibilitar ao usuário administrador a realização de cadastros e gerenciamentos de cadastros.   
• O sistema deve possibilitar ao proprietário a realização de cadastro.        
• O sistema deve possuir níveis de acesso.    
• O sistema deve possibilitar a visualização de resultados individuais e totais, de acordo com o nível de acesso do usuário.   
• O sistema deve possuir um Design para mobile responsivo.    


# 5.Casos de Teste
<image src="img/caso de teste tabela.png"></image>




   
# Registro de Testes de Software

Relatório contendo as evidências dos testes de software, realizados no sistema. O registro de testes foi baseado no Plano de Testes de Software, Seção 8. Plano de Testes de Software deste documento.

## 1.Avaliação dos Requisitos a Testar
Os resultados estavam dentro do esperado para os requisitos.


### Resultados dos Requisitos a Testar
Tipo     | Subtipo | Teste                                        | Resultado | Data | Responsável|Descrição|
|---------|----------|----------------------------------------------|-----------|------|------------|---------|
|Funcional|Requisitos| Cadastrar Dieta  |Ok|08.12.2021|Thiago| Foi possível cadastrar Dieta e armazenar no banco de dados.|
|Funcional|Requisitos| Buscar Dieta  |Ok|08.12.2021|Thiago|Foi possível buscar a dieta do banco. |
|Funcional|Requisitos| Editar e deletar dieta |Ok|08.12.2021|Thiago|Foi possível editar o nome da dieta e deletá-la do banco de dados.|
|Funcional|Requisitos| Compras|OK|08.12.2021|Thiago| Foi possível cadastrar a compra de insumos e sua nota fiscal no banco de dados.|
|Não Funcional|Requisitos| Autenticação - RNF-001|OK|08.12.2021|Thiago|Foi possível acessar as funcionalidades a partir da entrada de usuários e senhas cadastrados, sendo a senha definida por padrão, tendo que ser implementada uma função para guardar senhas inseridas pelos usuários nas proximas versões|
|Não Funcional|Implementação| O sistema deve ser responsivo para rodar em um dispositivo móvel - RNF-002|OK|08.12.2021|Thiago| O sistema foi responsivo e as telas se ajustaram a um dispositivo móvel|
|Não Funcional|Implementação| O sistema deve permitir o armazenamento mesmo offline - RNF-003|Ok|08.12.2021|Thiago| Foi possível executar as funcionalidades mesmo offline com o sistema já inicializado previamente.|
|Não Funcional|Performance| O  sistema deve processar requisições do usuário em no máximo 3s - RNF-004|OK|08.12.2021|Thiago| A maioria das requisições foi realizada em menos de 1 segundo|














## 2.Avaliação dos Resultados dos Casos de Teste

Os resultados alcançados estavam, em sua maioria, dentro do esperado para os Casos de Teste.

### Resultados dos Casos de Teste
|Caso  de Uso| ID| Teste                                        | Resultado | Data | Responsável|Descrição|
|---------|----------|----------------------------------------------|-----------|------|------------|---------|
|UC001 - HOME  | 1| Acessar página Home do site                                     | Ok | 08.12.2021 | Thiago |Foi possível acessar a página de Home e ver seu conteúdo. |
|UC001 - HOME  | 2| Clicar em uma das categorias                                     | Ok | 08.12.2021 | Thiago |Ao clicar na categoria na página, a mesma foi redirecionada para a página de equivalência da categoria.|
|FA01 –  Fazer Login | 1| Acessar página Home do site                                     | Ok | 08.12.2021 | Thiago |Foi possível acessar a página de Home e ver seu conteúdo. |
| FA01 –  Fazer Login | 2| Clicar no link superior direito “Login”                                     | Ok | 08.12.2021 | Thiago |Foi possível acessar a página para se realizar Login. |
| FA01 –  Fazer Login | 3| Informar Usuário e Senha                                     | Ok | 08.12.2021 | Thiago |Foi possível acessar a página de workpage |
|FA02 –  Acessar as funcionalidades do sistema | 1| Acessar página Home do site                                     | Ok | 08.12.2021 | Thiago |Foi possível acessar a página de Home e ver seu conteúdo. |
| FA02 –  Acessar funcionalidades do sistema | 2| Clicar no link superior direito “Login”                                     | Ok | 08.12.2021 | Thiago |Foi possível acessar a página para se realizar Login. |
| FA02 –  Acessar funcionalidades do sistema| 3| Informar Usuário e Senha | Ok | 08.12.2021 | Thiago |Foi possível acessar a página de workpage |
|FA02 - Acessar funcionalidades do sistema|4| Clicar em uma das categorias|Ok | 08.12.2021 | Thiago | Ao clicar, é redirecionado para as páginas de cada categoria |

