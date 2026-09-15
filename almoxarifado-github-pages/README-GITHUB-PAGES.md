# Almoxarifado — versão GitHub Pages

Esta pasta contém uma versão **100% estática** do sistema para publicação no GitHub Pages.

## Importante
GitHub Pages não executa Node.js/Express nem SQLite. Por isso esta versão substitui a API e o banco do servidor por `localStorage` do navegador, mantendo as funcionalidades de demonstração da interface.

- Login demo: `admin` / `1234`
- Dados ficam salvos somente no navegador/dispositivo.
- Para um sistema multiusuário real, mantenha o backend Node/Express e publique-o em um serviço de hospedagem de backend.

## Publicação
Coloque o conteúdo desta pasta na raiz do repositório ou publique a pasta `docs` pelo branch `main`.

No GitHub:
Settings → Pages → Deploy from a branch → `main` → `/docs` → Save.

A página deve ficar disponível em:
`https://henriquelimaaa.github.io/atividade-15-09/`
