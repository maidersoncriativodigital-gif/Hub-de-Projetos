// Referências DOM
const imagem = document.getElementById('Image');
const narrativa = document.getElementById('narrativa');
const startBtn = document.getElementById('start');
const choicesDiv = document.getElementById('choices');
const choiceButtons = document.querySelectorAll('.choice');
const resetBtn = document.getElementById('reset');

// Modal elementos (serão criados se não existirem)
let playerName = '';

// estado
let started = false;

function setScene(text, src, alt) {
	imagem.style.transform = 'scale(.98)';
	imagem.style.opacity = 0;
	narrativa.style.opacity = 0;
	setTimeout(() => {
		if (src) imagem.src = src;
		if (alt) imagem.alt = alt;
		narrativa.textContent = text;
		imagem.style.opacity = 1;
		imagem.style.transform = 'scale(1)';
		narrativa.style.opacity = 1;
	}, 300);
}

function startJourney(name) {
	started = true;
	playerName = name || '';
	startBtn.disabled = true;
	choicesDiv.setAttribute('aria-hidden', 'false');
	resetBtn.setAttribute('aria-hidden', 'false');
	choiceButtons.forEach(b => b.disabled = false);
	choicesDiv.style.display = 'flex';
	resetBtn.style.display = 'inline-block';

	const intro = playerName ? `${playerName}, três passagens se abrem:` : 'Três passagens se abrem:';
	setScene(`${intro} uma brilha dourada, outra está coberta por teias, e a terceira desce em espiral para as sombras. Escolha uma passagem (ou pressione 1-3).`);
}

function handleChoice(num) {
	choiceButtons.forEach(b => b.disabled = true);
	if (num === 1) {
		setScene('Você encontrou a câmara do ouro! O brilho é ofuscante e você enche as mãos de barras.', 'Tesouro.png', 'Uma pilha de barras de ouro!');
	} else if (num === 2) {
		setScene('Você atravessou a ponte invisível com sucesso! Do outro lado espera um antigo mapa.', 'Ponte invisível.png', 'Uma ponte invisível e assustadora...');
	} else if (num === 3) {
		setScene('Você desceu ao poço das sombras... Um eco sussurra segredos antigos.', 'Poço das Sombras.png', 'Um poço cheio de sombras...');
	} else {
		setScene('Você caiu em uma armadilha! Pegajosa e inesperada, mas não fatal. Tente novamente.', 'Armadilha.png', 'Uma armadilha pegajosa!');
	}
}

startBtn.addEventListener('click', () => {
	// mostrar modal para pedir nome do jogador
	openNameModal();
});

choiceButtons.forEach(btn => {
	btn.addEventListener('click', (e) => {
		const n = Number(e.currentTarget.dataset.choice);
		handleChoice(n);
	});
});

resetBtn.addEventListener('click', () => {
	// restaurar estado inicial e imagem da caverna
	startBtn.disabled = false;
	choicesDiv.style.display = 'none';
	resetBtn.setAttribute('aria-hidden', 'true');
	resetBtn.style.display = 'none';
	resetBtn.blur();
	choiceButtons.forEach(b => b.disabled = true);
	// recarrega a imagem da caverna de entrada explicitamente
	imagem.src = 'Caverna.png';
	imagem.alt = 'Entrada de uma caverna!';
	setScene('Clique em "Iniciar Jornada" para começar a aventura.');
	started = false;
	playerName = '';
});

document.addEventListener('keydown', (e) => {
	if (!started) return;
	if (['1','2','3'].includes(e.key)) {
		handleChoice(Number(e.key));
	} else if (e.key.toLowerCase() === 'r') {
		resetBtn.click();
	}
});

/* Modal name capture implementation */
function openNameModal(){
	// criar modal se não existir
	let existing = document.getElementById('name-modal');
	let previouslyFocused = document.activeElement;
	if (existing) {
		existing.hidden = false;
		existing.classList.add('open');
		document.getElementById('player-name').focus();
		document.body.classList.add('no-scroll');
		return;
	}

	const modal = document.createElement('div');
	modal.id = 'name-modal';
	modal.className = 'modal open';
	modal.innerHTML = `
		<div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="name-modal-title" tabindex="-1">
			<button class="modal-close" aria-label="Fechar">×</button>
			<h3 id="name-modal-title">Antes de entrar...</h3>
			<p>Deseja inserir seu nome para personalizar a jornada? (opcional)</p>
			<input id="player-name" type="text" placeholder="Seu nome" />
			<div class="modal-actions">
				<button class="btn btn-primary" id="name-ok">Iniciar</button>
				<button class="btn btn-secondary" id="name-skip">Pular</button>
			</div>
		</div>`;

	document.body.appendChild(modal);
	document.body.classList.add('no-scroll');

	const dialog = modal.querySelector('.modal-dialog');
	const input = document.getElementById('player-name');
	const ok = document.getElementById('name-ok');
	const skip = document.getElementById('name-skip');
	const closeBtn = modal.querySelector('.modal-close');

	// focar no input
	input.focus();

	ok.addEventListener('click', () => {
		const name = input.value.trim();
		closeNameModal();
		startJourney(name);
		if (previouslyFocused) previouslyFocused.focus();
	});
	skip.addEventListener('click', () => { closeNameModal(); startJourney(''); if (previouslyFocused) previouslyFocused.focus(); });

	// fechar
	closeBtn.addEventListener('click', () => { closeNameModal(); if (previouslyFocused) previouslyFocused.focus(); });
	modal.addEventListener('click', (e) => { if (e.target === modal) { closeNameModal(); if (previouslyFocused) previouslyFocused.focus(); } });

		// ESC
		function escHandler(e){ if (e.key === 'Escape') { closeNameModal(); if (previouslyFocused) previouslyFocused.focus(); } }

		// focus trap simples
		function trapTabKey(e){
			if (e.key !== 'Tab') return;
			const focusable = dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
			const first = focusable[0];
			const last = focusable[focusable.length -1];
			if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
			else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
		}

		document.addEventListener('keydown', escHandler);
		dialog.addEventListener('keydown', trapTabKey);

		// armazenar referências para remover depois
		modal._escHandler = escHandler;
		modal._trapHandler = trapTabKey;
}

function closeNameModal(){
	const m = document.getElementById('name-modal');
	if (!m) return;
	m.classList.remove('open');
	// remover listeners se existirem
	if (m._escHandler) document.removeEventListener('keydown', m._escHandler);
	if (m._trapHandler) {
		const dialog = m.querySelector('.modal-dialog');
		dialog.removeEventListener('keydown', m._trapHandler);
	}
	// animar e remover do DOM
	setTimeout(() => {
		try { m.remove(); } catch (err) { m.hidden = true; }
	}, 260);
	document.body.classList.remove('no-scroll');
}

