# ENTREGA 08 — Descritivo de Casos de Teste de Software

## Ferramentas e ambiente
- Visual Studio Code
- Node.js 22.x
- SQLite 3.x
- Google Chrome / Microsoft Edge
- Windows 10/11 64 bits

## Casos de teste

| ID | Requisito | Procedimento | Resultado esperado |
|---|---|---|---|
| CT01 | RF01 | Informar usuário e senha válidos. | Acesso ao painel principal. |
| CT02 | RF01 | Informar senha inválida. | Sistema informa falha e retorna ao login. |
| CT03 | RF02 | Clicar em Sair. | Sessão encerrada e tela de login exibida. |
| CT04 | RF03 | Entrar no sistema. | Nome do usuário aparece no cabeçalho. |
| CT05 | RF04 | Cadastrar produto com dados válidos. | Produto é salvo e aparece na tabela. |
| CT06 | RF05 | Abrir Cadastro de Produtos. | Produtos cadastrados são carregados automaticamente. |
| CT07 | RF06 | Pesquisar por nome ou código. | Apenas registros correspondentes aparecem. |
| CT08 | RF07 | Editar produto existente. | Dados alterados são persistidos. |
| CT09 | RF08 | Excluir produto sem movimentações. | Produto é removido da lista. |
| CT10 | RF09 | Enviar formulário vazio. | Sistema bloqueia o envio e exibe validação. |
| CT11 | RF10 | Abrir Gestão de Estoque. | Produtos aparecem em ordem alfabética. |
| CT12 | RF10 | Selecionar Entrada. | Campo de quantidade fica disponível e movimentação pode ser registrada. |
| CT13 | RF10 | Selecionar Saída. | Campo de quantidade fica disponível e movimentação pode ser registrada. |
| CT14 | RF11 | Informar uma data de movimentação. | Data é armazenada junto à movimentação. |
| CT15 | RF12 | Registrar entrada. | Estoque aumenta pela quantidade informada. |
| CT16 | RF12 | Registrar saída válida. | Estoque diminui pela quantidade informada. |
| CT17 | RF12 | Registrar saída maior que estoque. | Sistema bloqueia a operação. |
| CT18 | RF13 | Fazer saída que deixa estoque abaixo do mínimo. | Alerta de estoque mínimo é exibido. |
| CT19 | RF14 | Consultar histórico. | Produto, tipo, quantidade, data e responsável aparecem. |

## Critério de aprovação
Todos os casos devem produzir o resultado esperado. Casos que falharem devem ser corrigidos e executados novamente antes da entrega.
