# Jogo da Velha — Instruções de Uso e Desenvolvimento

Última atualização: 2026-03-30

## 🎮 Como Jogar (Guia do Utilizador)

Este é um clássico Jogo da Velha (Tic-Tac-Toe) com funcionalidades avançadas. Abaixo explicamos como utilizar a interface da página:

### Objetivo
Alinhar 3 símbolos idênticos (X ou O) na horizontal, vertical ou diagonal para vencer a ronda.

### Funcionalidades e Controlos da Página
- **Escolha do Lado:** No menu suspenso, escolha se quer ser o jogador "X" ou "O" e clique no botão **Jogar** para iniciar a partida.
- **Dica:** Não sabe onde jogar? Clique neste botão e o jogo irá sugerir o melhor movimento disponível.
- **Modo IA (Inteligência Artificial):** - **IA: OFF**: Joga contra outra pessoa no mesmo computador (alternando turnos).
  - **IA: ON**: Joga contra o computador.
- **Placar:** O jogo regista automaticamente as vitórias do Jogador X, do Jogador O e os Empates.
- **Novo Jogo:** Limpa o tabuleiro atual para começar uma nova ronda, mas mantém o placar intacto.
- **Zerar Placar:** Apaga o histórico de vitórias e empates, voltando tudo a zero.

---

## 🛠️ Instruções Técnicas (Para Desenvolvedores)

**Resumo:** Projeto front-end puramente construído com HTML, CSS e JS.

### Pré-requisitos
- Um navegador web moderno (Chrome, Firefox, Edge, Safari).

### Como executar localmente
Pode abrir o ficheiro `index.html` diretamente no navegador, ou correr um servidor local. Se optar pelo servidor local (Python):

```powershell
cd "c:\Users\0001150903\Desktop\Hub de Projetos\Jogo-da-Velha"
python -m http.server 8000
