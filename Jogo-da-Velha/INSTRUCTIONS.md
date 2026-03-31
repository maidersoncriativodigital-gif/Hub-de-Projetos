# Jogo-da-Velha — INSTRUCTIONS

Última atualização: 2026-03-30

Resumo
- Projeto: Jogo da Velha
- Propósito: Jogo front-end (tic-tac-toe). Instruções para testar localmente e para lidar com estados salvos (localStorage) ou múltiplos jogadores.

Pré-requisitos
- Navegador moderno.

Como executar local

```powershell
cd "c:\Users\0001150903\Desktop\Hub de Projetos\Jogo-da-Velha"
python -m http.server 8000
```

- Abrir `http://localhost:8000/index.html`.

Dados e estado salvo
- Se o jogo salva estado no localStorage, limpe com:

```javascript
localStorage.removeItem('tic_tac_state');
localStorage.removeItem('tic_tac_player');
```

Credenciais/contas
- Normalmente não aplicável — se o projeto tiver login, documente credenciais de teste.

Reset e seed
- Não aplicável a menos que haja persistência em servidor; para persistência local apenas limpar `localStorage`.

Troubleshooting
- Jogo não inicia: abrir console (F12) para ver erros de JS e paths de recursos.

Contato
- Abra uma issue com descrição e passos de reprodução.
