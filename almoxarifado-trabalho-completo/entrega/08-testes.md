# 8. Casos de Teste

| ID | Cenário | Passos | Resultado esperado |
|---|---|---|---|
| CT01 | Login válido | Informar admin/1234 | Dashboard é exibido |
| CT02 | Login inválido | Informar senha incorreta | Mensagem de erro |
| CT03 | Logout | Clicar em Sair | Retorna à tela de login |
| CT04 | Cadastrar produto | Preencher formulário válido | Produto aparece na lista |
| CT05 | Campo obrigatório | Tentar salvar sem nome | Sistema rejeita |
| CT06 | Editar produto | Alterar nome/quantidade | Dados atualizados |
| CT07 | Excluir produto | Excluir item | Item removido |
| CT08 | Entrada | Registrar 10 unidades | Saldo aumenta em 10 |
| CT09 | Saída válida | Retirar quantidade disponível | Saldo diminui |
| CT10 | Saída inválida | Retirar mais que o saldo | Operação bloqueada |
| CT11 | Estoque mínimo | Deixar saldo abaixo do mínimo | Produto aparece nos alertas |
| CT12 | Histórico | Registrar movimentação e abrir histórico | Registro aparece |
| CT13 | Pesquisa | Buscar por nome/código | Lista é filtrada |
| CT14 | Persistência Pages | Recarregar a página após cadastro | Dados continuam no navegador |
| CT15 | Responsividade | Abrir em tela estreita | Interface continua utilizável |
