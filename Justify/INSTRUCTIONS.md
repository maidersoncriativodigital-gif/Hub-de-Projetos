# Justify — INSTRUCTIONS

Última atualização: 2026-03-30

Resumo
- Projeto: Justify
- Propósito: Interface/fluxo para digitalizar processos acadêmicos (workflow). Estas instruções cobrem como testar localmente, gerir credenciais de teste e cuidar de dados sensíveis.

Importante (assunções)
- Este repositório parece ser principalmente front-end (HTML/CSS/JS). Se houver um back-end separado, adapte as seções de server abaixo.
- Não incluímos segredos reais nos ficheiros. Use `.env` local para variáveis privadas.

Pré-requisitos
- Navegador moderno (Chrome, Edge, Firefox).
- Para servir localmente: Python 3 (opcional) ou Node.js (se houver scripts/server).

Variáveis de ambiente (opcional)
- Se o projeto tiver um servidor, crie um ficheiro `.env` baseado neste exemplo (`.env.example` fornecido). Não commite `.env`.

Exemplo `.env` (dev) — veja `./.env.example`
```
PORT=3000
DATABASE_URL=sqlite:./data/justify.db
JWT_SECRET=change_this_for_dev
EMAIL_PROVIDER=none
```

Contas de teste (sugestão)
- admin@local.test / Senha: Admin123!
- user@local.test / Senha: User123!

Como executar local (cenários)

1) Projeto estático (somente front-end)
- Abra terminal na pasta `Justify` e execute:

```powershell
# Servir em http://localhost:8000
python -m http.server 8000
```

- Abra `http://localhost:8000/index.html` no navegador.

2) Projeto com back-end (Node / outro)
- Instale dependências: `npm install` (se existir `package.json`).
- Crie `.env` a partir de `.env.example` e ajuste valores.
- Rodar seed (se existir): `npm run seed`.
- Iniciar servidor: `npm start` (ou conforme `package.json`).

Dados e seed
- Se houver um script de seed, execute-o apenas em ambiente de desenvolvimento; ele cria contas demo e dados de exemplo.
- Para resetar a base de dados, procuro por scripts como `reset-db`, `reset_db.py` ou comandos dentro de `package.json`.

Fluxo de login (teste)
- Endpoint (exemplo): `POST /api/login` com body JSON `{ "email": "user@local.test", "password": "User123!" }`.
- Rotas protegidas normalmente exigem `Authorization: Bearer <token>` — o token é retornado no login.

Avisos de segurança
- Nunca commite ficheiros `.env` com segredos reais.
- Se usar dados reais, anonimize antes de usar em ambiente de desenvolvimento.

Soluções para problemas comuns
- Página em branco: verifique console do navegador (F12) e paths de recursos (CSS/JS).
- Imagens não carregam: confirmar nomes/paths exatos (atenção a espaços e acentos).

Contato
- Abra uma issue neste repositório indicando o problema, o browser e os passos para reproduzir.

--
Observação: posso adaptar este ficheiro para incluir passos específicos do back-end se me disser qual stack (Node/Express, Python/Flask, etc.) e se quiser que eu gere scripts de seed ou `.env` adicionais.
