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

## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário master  cadastre seus colaboradores | ALTA | 
|RF-002| Permitir o gerenciamento dos insumos| ALTA |
|RF-003| Permitir o cadastros de informações sobre fornecedores de ração e suplemento alimentar| BAIXA |
|RF-004| Permitir a inserção de dados para cálcular insumos necessários por animal | ALTA |
|RF-005| Permitir o gerenciamento sobre condição geral do animal | ALTA |
|RF-006| Emitir um relatório de controle financeiro | BAIXA
|RF-007| Apresentar sugestões de dietas adequadas as condições gerais dos animais | MÉDIA |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em um dispositivo móvel | MÉDIA | 
|RNF-002| Deve processar requisições do usuário em no máximo 3s |  BAIXA |  
|RNF-003| O sistema deve permitir o registro de informações mesmo offline | MÉDIA |
|RNF-004| O sistema deve possibilitar visualização em Alto Contraste | BAIXA |
|RNF-005| Registrar as ações de cada usuário do sistema | BAIXA |


## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|01| O projeto deverá ser entregue até o final do semestre |
|02| Não pode ser desenvolvido um módulo de backend        |
