# Sistema de Gestão de Almoxarifado — Trabalho Completo

Projeto acadêmico completo para controle de estoque/almoxarifado.

## Entregáveis
1. Requisitos funcionais e não funcionais
2. DER
3. Script SQL do banco `almoxarifado_db`
4. Sistema web
5. Login/logout e interface
6. Cadastro e gestão de produtos
7. Entradas e saídas de estoque
8. Alertas de estoque mínimo
9. Histórico de movimentações
10. Casos de teste
11. Requisitos de infraestrutura
12. Versão pronta para GitHub Pages

## Estrutura
- `entrega/` — documentação final para apresentar
- `docs/` — versão estática publicada pelo GitHub Pages
- `sistema/` — versão completa com Node.js/Express/SQLite
- `almoxarifado_db.sql` — banco e dados iniciais
- `DER.dot` / `DER.svg` — modelo entidade-relacionamento

## Observação importante
GitHub Pages executa arquivos estáticos. Portanto, a pasta `docs/` funciona online sem servidor, usando `localStorage` para a demonstração. A pasta `sistema/` contém a arquitetura completa com API e SQLite para execução com Node.js.

Usuários de demonstração: `admin/1234`, `lucas/1234`, `operador/1234`.
