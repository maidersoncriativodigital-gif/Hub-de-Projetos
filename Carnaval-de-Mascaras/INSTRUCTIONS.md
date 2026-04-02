# Carnaval de Máscaras — Instruções de Uso e Desenvolvimento

Última atualização: 2026-03-30

## 🎭 Como Usar (Guia do Utilizador)

Esta é uma página interativa temática que simula a verificação de entrada numa festa de Carnaval Veneziano. Para interagir com a página:

1. **Iniciar Verificação:** Clique no botão principal **"Entrar"** na página inicial.
2. **Preencher os Dados:** Uma janela (modal) aparecerá no ecrã. Preencha os seguintes campos:
   - **Nome:** O seu nome.
   - **Idade:** A sua idade atual (apenas números).
   - **Está usando máscara?:** Escolha "Sim" ou "Não" no menu suspenso.
3. **Verificar Permissão:** Clique no botão azul **"Verificar"**. A página irá processar os seus dados e mostrar uma mensagem no ecrã a informar se tem permissão para entrar na festa (com base nas regras de idade e uso de máscara do evento).
4. **Cancelar/Fechar:** Se quiser fechar a janela sem preencher nada, pode clicar no botão **"Cancelar"** ou no **"×"** no canto superior.

---

## 🛠️ Instruções Técnicas (Para Desenvolvedores)

**Resumo:** Projeto front-end (HTML, CSS, JS) focado na manipulação do DOM, gestão de eventos de clique e validação de formulários dentro de modais.

### Pré-requisitos
- Navegador web moderno.
- Opcional: Servidor local simples (ex: Python) para servir os ficheiros estáticos.

### Como executar localmente

Pode abrir o ficheiro `index.html` diretamente no navegador, ou usar um servidor local pelo terminal:

```powershell
# Navegar até à pasta do projeto
cd "c:\Users\0001150903\Desktop\Hub de Projetos\Carnaval-de-Mascaras"

# Iniciar servidor na porta 8000
python -m http.server 8000
