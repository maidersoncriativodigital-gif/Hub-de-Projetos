// Tic-Tac-Toe — versão finalizada e polida
(() => {
    // Estado
    let board = [[null, null, null],[null, null, null],[null, null, null]];
    let currentPlayer = 'X';
    let gameOver = false;
    let suggested = null;
    let winningLine = null;

    let aiEnabled = false;
    let aiThinking = false;
    let aiPlayer = 'O';
    let humanPlayer = 'X';

    // Scores com persistência
    const STORAGE_KEY = 'tic_scores_v1';
    let scores = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null') || { X: 0, O: 0, draws: 0 };

    // Refs
    const boardEl = document.getElementById('board');
    const statusEl = document.getElementById('status');
    const scoreXEl = document.getElementById('score-x');
    const scoreOEl = document.getElementById('score-o');
    const scoreDrawsEl = document.getElementById('score-draws');
    const itemX = document.getElementById('item-x');
    const itemO = document.getElementById('item-o');

    // Inicializa UI
    function syncScoreUI() {
        scoreXEl.textContent = scores.X;
        scoreOEl.textContent = scores.O;
        scoreDrawsEl.textContent = scores.draws;
    }

    function persistScores() {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(scores)); } catch(e) { /* ignore */ }
    }

    function updateScoreUI(winner) {
        if (winner === 'X') scores.X++;
        else if (winner === 'O') scores.O++;
        else if (winner === 'draw') scores.draws++;
        syncScoreUI();
        persistScores();
    }

    function checkWin(b) {
        const lines = [
            [[0,0],[0,1],[0,2]], [[1,0],[1,1],[1,2]], [[2,0],[2,1],[2,2]],
            [[0,0],[1,0],[2,0]], [[0,1],[1,1],[2,1]], [[0,2],[1,2],[2,2]],
            [[0,0],[1,1],[2,2]], [[0,2],[1,1],[2,0]]
        ];
        for (const line of lines) {
            const [[r1,c1],[r2,c2],[r3,c3]] = line;
            if (b[r1][c1] && b[r1][c1] === b[r2][c2] && b[r1][c1] === b[r3][c3]) {
                return { winner: b[r1][c1], line };
            }
        }
        return null;
    }

    function isFull(b) { return b.every(row => row.every(cell => cell !== null)); }

    // --- Minimax IA (profissional) ---
    function bestMoveFor(player, boardSnapshot) {
        const opp = player === 'X' ? 'O' : 'X';

        function minimax(b, depth, isMaximizing) {
            const w = checkWin(b);
            if (w) return (w.winner === player) ? 10 - depth : depth - 10;
            if (isFull(b)) return 0;

            if (isMaximizing) {
                let best = -Infinity;
                for (let r=0;r<3;r++) for (let c=0;c<3;c++) if (b[r][c] === null) {
                    b[r][c] = player;
                    best = Math.max(best, minimax(b, depth+1, false));
                    b[r][c] = null;
                }
                return best;
            } else {
                let best = Infinity;
                for (let r=0;r<3;r++) for (let c=0;c<3;c++) if (b[r][c] === null) {
                    b[r][c] = opp;
                    best = Math.min(best, minimax(b, depth+1, true));
                    b[r][c] = null;
                }
                return best;
            }
        }

        let bestScore = -Infinity; let bestMove = null;
        const copy = boardSnapshot || board;
        for (let r=0;r<3;r++) for (let c=0;c<3;c++) if (copy[r][c] === null) {
            copy[r][c] = player;
            const sc = minimax(copy, 0, false);
            copy[r][c] = null;
            if (sc > bestScore) { bestScore = sc; bestMove = { r, c }; }
        }
        return bestMove;
    }

    function render() {
        boardEl.innerHTML = '';
        itemX.classList.toggle('active', currentPlayer === 'X' && !gameOver);
        itemO.classList.toggle('active', currentPlayer === 'O' && !gameOver);

        for (let r=0;r<3;r++) for (let c=0;c<3;c++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.setAttribute('role','gridcell');
            cell.tabIndex = gameOver ? -1 : 0;
            cell.dataset.r = r; cell.dataset.c = c;
            const v = board[r][c];
            if (v) { cell.dataset.val = v; cell.textContent = v; }
            else cell.textContent = '';

            if (suggested && suggested.r === r && suggested.c === c) cell.classList.add('suggest');
            if (winningLine && winningLine.some(([wr,wc]) => wr===r && wc===c)) cell.classList.add('win');
            if (gameOver || v !== null) cell.classList.add('disabled');

            boardEl.appendChild(cell);
        }

        const winInfo = checkWin(board);
        if (winInfo) {
            gameOver = true;
            winningLine = winInfo.line;
            updateScoreUI(winInfo.winner);
            statusEl.textContent = `Vitória do ${winInfo.winner}!`;
            statusEl.style.color = winInfo.winner === 'X' ? 'var(--x-color)' : 'var(--o-color)';
            // realçar linha vencedora
            winningLine = winInfo.line;
        } else if (isFull(board)) {
            gameOver = true;
            updateScoreUI('draw');
            statusEl.textContent = 'Empate!';
            statusEl.style.color = 'var(--text-main)';
        } else {
            statusEl.textContent = `Vez do: ${currentPlayer}`;
            statusEl.style.color = currentPlayer === 'X' ? 'var(--x-color)' : 'var(--o-color)';
        }
    }

    function makeMove(r,c) {
        if (gameOver || board[r][c] !== null) return false;
        board[r][c] = currentPlayer;
        suggested = null;
        const winInfo = checkWin(board);
        if (winInfo) {
            gameOver = true; winningLine = winInfo.line; updateScoreUI(winInfo.winner);
        } else if (isFull(board)) { gameOver = true; updateScoreUI('draw'); }
        else { currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; }
        render();

        if (aiEnabled && !gameOver && currentPlayer === aiPlayer && !aiThinking) {
            aiThinking = true;
            setTimeout(() => {
                const mv = bestMoveFor(aiPlayer, board);
                if (mv) makeMove(mv.r, mv.c);
                aiThinking = false;
            }, 250);
        }
        return true;
    }

    // Eventos
    boardEl.addEventListener('click', (e) => {
        if (aiThinking || gameOver) return;
        const cell = e.target.closest('.cell');
        if (!cell) return;
        if (cell.classList.contains('disabled')) return;
        makeMove(Number(cell.dataset.r), Number(cell.dataset.c));
    });

    // Keyboard support: navegação com setas e Enter
    boardEl.addEventListener('keydown', (e) => {
        const active = document.activeElement;
        if (!active || !active.classList.contains('cell')) return;
        const r = Number(active.dataset.r), c = Number(active.dataset.c);
        let nr=r, nc=c;
        if (e.key === 'ArrowUp') nr = Math.max(0, r-1);
        else if (e.key === 'ArrowDown') nr = Math.min(2, r+1);
        else if (e.key === 'ArrowLeft') nc = Math.max(0, c-1);
        else if (e.key === 'ArrowRight') nc = Math.min(2, c+1);
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!active.classList.contains('disabled')) makeMove(r,c); return; }
        const selector = `.cell[data-r="${nr}"][data-c="${nc}"]`;
        const next = boardEl.querySelector(selector);
        if (next) next.focus();
    });

    // Botões
    document.getElementById('reset').addEventListener('click', () => {
        board = [[null,null,null],[null,null,null],[null,null,null]];
        currentPlayer = 'X'; gameOver = false; suggested = null; winningLine = null;
        document.getElementById('sideSelect').disabled = false;
        document.getElementById('confirmSide').disabled = false;
        render();
        // se IA joga primeiro
        if (aiEnabled && currentPlayer === aiPlayer) {
            setTimeout(() => { const mv = bestMoveFor(aiPlayer, board); if (mv) makeMove(mv.r, mv.c); }, 300);
        }
    });

    document.getElementById('clearScore').addEventListener('click', () => {
        scores = { X:0, O:0, draws:0 };
        persistScores(); syncScoreUI();
    });

    document.getElementById('suggest').addEventListener('click', () => {
        if (gameOver) return;
        const mv = bestMoveFor(currentPlayer, board);
        if (mv) suggested = mv;
        render();
    });

    document.getElementById('aiToggle').addEventListener('click', (e) => {
        aiEnabled = !aiEnabled;
        e.target.textContent = `IA: ${aiEnabled ? 'ON' : 'OFF'}`;
        e.target.classList.toggle('secondary', !aiEnabled);
        if (aiEnabled && !gameOver && currentPlayer === aiPlayer) {
            const mv = bestMoveFor(aiPlayer, board); if (mv) makeMove(mv.r, mv.c);
        }
    });

    document.getElementById('confirmSide').addEventListener('click', (e) => {
        humanPlayer = document.getElementById('sideSelect').value;
        aiPlayer = humanPlayer === 'X' ? 'O' : 'X';
        document.getElementById('sideSelect').disabled = true;
        e.target.disabled = true;
        if (aiEnabled && currentPlayer === aiPlayer) { const mv = bestMoveFor(aiPlayer, board); if (mv) makeMove(mv.r, mv.c); }
    });

    // Inicialização
    syncScoreUI(); render();
})();

