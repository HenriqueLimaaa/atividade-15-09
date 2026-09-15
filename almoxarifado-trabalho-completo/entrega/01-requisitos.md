# 1. Requisitos Funcionais

**RF01 — Autenticação:** o sistema deve permitir login com usuário e senha.
**RF02 — Logout:** o sistema deve permitir encerrar a sessão.
**RF03 — Dashboard:** exibir total de produtos, estoque baixo, entradas e saídas.
**RF04 — Cadastro de produto:** cadastrar código, nome, categoria, unidade, quantidade e estoque mínimo.
**RF05 — Consulta:** listar e pesquisar produtos.
**RF06 — Alteração:** editar dados de produtos.
**RF07 — Exclusão:** excluir produto quando permitido.
**RF08 — Entrada:** registrar entrada e atualizar o saldo.
**RF09 — Saída:** registrar saída e impedir saldo negativo.
**RF10 — Alertas:** destacar produtos cuja quantidade esteja abaixo do estoque mínimo.
**RF11 — Histórico:** registrar e consultar movimentações com data, tipo, quantidade e responsável.
**RF12 — Persistência:** manter os dados entre acessos na versão com banco; na versão Pages, usar armazenamento local do navegador.
**RF13 — Validação:** impedir campos obrigatórios vazios e valores inválidos.
**RF14 — Perfis:** identificar o usuário responsável pelas movimentações.
**RF15 — Interface:** disponibilizar navegação por Dashboard, Produtos, Movimentações, Histórico e Alertas.

# Requisitos Não Funcionais

**RNF01:** interface responsiva para computador e celular.
**RNF02:** mensagens claras de sucesso e erro.
**RNF03:** código organizado em frontend, backend e banco.
**RNF04:** operações de estoque devem manter consistência dos saldos.
**RNF05:** senhas não devem ser armazenadas em texto puro em uma aplicação real; a versão didática usa credenciais de demonstração.
**RNF06:** o sistema deve ser simples de instalar e executar.
**RNF07:** a versão estática deve funcionar em hospedagem de arquivos estáticos.
