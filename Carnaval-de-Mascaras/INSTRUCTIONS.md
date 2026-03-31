# Carnaval de Máscaras — INSTRUCTIONS

Última atualização: 2026-03-30

Resumo
- Projeto: Carnaval de Máscaras
- Propósito: Página interativa com validação temática e ilustrações. Estas instruções explicam como testar páginas que requerem login ou manipulação de dados locais.

Pré-requisitos
- Navegador moderno.
- Servidor local simples (Python) para servir ficheiros estáticos.

Contas de teste (se aplicável)
- Caso o projeto possua uma funcionalidade de login local, use contas demo no ficheiro `seed` ou `INSTRUCTIONS.md`.

Como executar local

```powershell
# Navegar até a pasta do projeto
cd "c:\Users\0001150903\Desktop\Hub de Projetos\Carnaval-de-Mascaras"
# Servir em http://localhost:8000
python -m http.server 8000
```

- Abrir `http://localhost:8000/index.html`.

Dados e reset
- Se o projeto usa armazenamento local (localStorage/indexedDB), documente as chaves a limpar no console do devtools:

```javascript
// Exemplo: limpar chaves no console
localStorage.removeItem('carnaval_user');
localStorage.removeItem('carnaval_session');
```

Fluxo de login (se existir)
- Caso haja uma tela de login que use armazenamento local, descreva campos e valores esperados.

Avisos
- Se for necessário testar com dados reais, crie uma cópia e anonimize.

Contato
- Abra uma issue com passos para reproduzir.
