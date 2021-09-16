# Especificações do Projeto

Definição do problema e ideia de solução a partir da perspectiva do usuário. É composta pela definição do  diagrama de personas, histórias de usuários, requisitos funcionais e não funcionais além das restrições do projeto.

Apresente uma visão geral do que será abordado nesta parte do documento, enumerando as técnicas e/ou ferramentas utilizadas para realizar a especificações do projeto

## Personas

A fim de compreender melhor o perfil dos clientes ideais que nosso sistema web almeja, foi elaborado o buyer persona de cada um das categorias encontradas no público-alvo, como podemos observar nas imagens abaixo.

<img src = "img/persona_prop.png">

<img src = "img/persona_vet.png">

<img src = "img/persona_operador.png">



## Histórias de Usuários

Com base na análise das personas foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE`  |PARA ... `MOTIVO/VALOR`                 |
|--------------------|-------------------------------------|----------------------------------------|
| Proprietário | Obter relatório de controle financeiro lucro/perdas| Gerenciar o negócio com mais facilidade e eficácia.
| Proprietário | Gerenciar usuários| Administrar usuários e verificar ações realizadas
| Proprietário | Selecionar a estratégia adequada para meu tipo de fazenda | Obter maior lucratividade e eficiência 
|Veterinário Encarregado| Obter relatório de ganho de peso dos animais| Saber se o animal se encontra na idade correta e peso adequado para abate
|Veterinário Encarregado| Consultar informações referente a raça, peso vivo, idade, sexo e taxa de ganho em peso esperado quando pesquisar pela ID do animal|Saber se o animal vai atingir as exigências nutricionais no período previsto
|Veterinário Encarregado| Realizar comparação entre uma dieta com maior teor de alimentos concentrados em relação a volumosos|Apresentar a melhor conversão alimentar para determinada época do ano
|Veterinário Encarregado| Obter relatório que apresente desempenho do animal com dieta x e y| Descobrir a melhor dieta para cada grupo do rebanho
|Veterinário Encarregado| Consultar relação entre a nutrição e bem-estar animal | Obter os melhores indicadores para realizar futuras aplicações de determinada dieta
|Operador 1          | Gerenciar controle de estoque e fornecedores de insumos  | Manter o estoque com quantidade adequada | 
|Operador 1          | Obter relatório de controle de insumos e sugestão de compras | Realizar aquisições eficientes sem necessidade de grandes estoques |
|Operador 2          | Obter cálculo da quantidade de insumos necessários por animal | Diminuir perdas de ração e suplemento alimentar|
|Operador 3          | Documentar frequência de alimentação e quantidade de insumos consumidos |  Acompanhar a evolução do ganho ou perda de peso do animal |
|Operador 3          | Acessar as informações necessárias sobre condição geral do animal | Definir o melhor momento para o abate |
|Operador 4          | Atualizar cadastro do animal | Registrar novos animais ou dar baixa de animais no sistema | 


Apresente aqui as histórias de usuário que são relevantes para o projeto de sua solução. As Histórias de Usuário consistem em uma ferramenta poderosa para a compreensão e elicitação dos requisitos funcionais e não funcionais da sua aplicação. Se possível, agrupe as histórias de usuário por contexto, para facilitar consultas recorrentes à essa parte do documento.

> **Links Úteis**:
> - [Histórias de usuários com exemplos e template](https://www.atlassian.com/br/agile/project-management/user-stories)
> - [Como escrever boas histórias de usuário (User Stories)](https://medium.com/vertice/como-escrever-boas-users-stories-hist%C3%B3rias-de-usu%C3%A1rios-b29c75043fac)
> - [User Stories: requisitos que humanos entendem](https://www.luiztools.com.br/post/user-stories-descricao-de-requisitos-que-humanos-entendem/)
> - [Histórias de Usuários: mais exemplos](https://www.reqview.com/doc/user-stories-example.html)
> - [9 Common User Story Mistakes](https://airfocus.com/blog/user-story-mistakes/)

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário master  cadastre seus colaboradores | ALTA | 
|RF-002| Emitir um relatório de lucro/perdas   | MÉDIA |
|RF-003| Permitir o cadastro da informação sobre data de validade dos lotes de ração e suplemento alimentar| MÉDIA |
|RF-004| Permitir o cadastros de informações sobre fornecedores de ração e suplemento alimentar| BAIXA |
|RF-005| Permitir a inserção de dados para cálcular insumos necessários por animal | ALTA |
|RF-006| Permitir o cadastro no sistema sobre frequência e a quantidade de insumos consumidos| ALTA |
|RF-007| Permitir acesso a relatórios sobre condição geral do animal | MÉDIA |
|RF-008| Permitir cadastro de informações sobre as dietas| ALTA |
|RF-009| Emitir um relatório da nutrição do animal | ALTA |
|RF-010| Emitir um relatório de controle financeiro | MÉDIA
|RF-011| Emitir um relatório da quantidade de alimentos MS (Matéria Seca)| ALTA |
|RF-012| Emitir um relatório de ganho de peso do animal | ALTA |
|RF-013| Emitir informações detalhadas do animal quando pesquisar pela sua ID | ALTA |
|RF-014| Emitir comparativo entre uma dieta com maior teor de concentrados em relação aos volumosos | ALTA |
|RF-015| Emitir um relatório dos registros realizados pelos usuários no sistema | MÉDIA |
|RF-016| Permitir gerenciamento de permissões dos outros usuários | MÉDIA |
|RF-017| Calcular sugestão de aquisição de insumos levando em conta o estoque e o consumo estimado | ALTA |
|RF-018| Calcular por quanto tempo o estoque de ração e suplemento alimentar irá durar |  ALTA |
|RF-019| Informar ao usuário que o estoque de ração e suplemento alimentar está baixo |  MÉDIA |
|RF-020| Apresentar a dieta ideal para cada grupo do rebanho | MÉDIA |
|RF-021| Apresentar uma dieta adequada para determinada época do ano | BAIXA |
### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivo móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA |  
|RNF-003| O sistema deve permitir o registro de informações mesmo offline | MÉDIA |
|RNF-004| O sistema deve possibilitar visualização em Alto Contraste | BAIXA |

Com base nas Histórias de Usuário, enumere os requisitos da sua solução. Classifique esses requisitos em dois grupos:

- [Requisitos Funcionais
 (RF)](https://pt.wikipedia.org/wiki/Requisito_funcional):
 correspondem a uma funcionalidade que deve estar presente na
  plataforma (ex: cadastro de usuário).
- [Requisitos Não Funcionais
  (RNF)](https://pt.wikipedia.org/wiki/Requisito_n%C3%A3o_funcional):
  correspondem a uma característica técnica, seja de usabilidade,
  desempenho, confiabilidade, segurança ou outro (ex: suporte a
  dispositivos iOS e Android).
Lembre-se que cada requisito deve corresponder à uma e somente uma
característica alvo da sua solução. Além disso, certifique-se de que
todos os aspectos capturados nas Histórias de Usuário foram cobertos.

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |


Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

> **Links Úteis**:
> - [O que são Requisitos Funcionais e Requisitos Não Funcionais?](https://codificar.com.br/requisitos-funcionais-nao-funcionais/)
> - [O que são requisitos funcionais e requisitos não funcionais?](https://analisederequisitos.com.br/requisitos-funcionais-e-requisitos-nao-funcionais-o-que-sao/)
