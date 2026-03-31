// Lógica de entrada no Carnaval de Máscaras
// Referências DOM
const btnEntrada = document.getElementById('entrada');
const modal = document.getElementById('modal');
const modalDialog = modal.querySelector('.modal-dialog');
const btnClose = modal.querySelector('.modal-close');
const btnCancel = document.getElementById('btn-cancel');
const form = document.getElementById('entrada-form');
const resultadoEl = document.getElementById('resultado');

// Listas de convidados
const listaConvidados = ['Clarisse', 'Gertrudes','Benjamin','Theo'];
const convidadosVIP = ['Marco','Yuri','Jade','Gizele'];

function openModal(){
	modal.hidden = false;
	modal.setAttribute('aria-hidden', 'false');
	resultadoEl.hidden = true;
	form.reset();
	// focar primeiro campo
	document.getElementById('nome').focus();
	// trap de foco simples
}

function closeModal(){
	modal.hidden = true;
	modal.setAttribute('aria-hidden', 'true');
}

btnEntrada.addEventListener('click', openModal);
btnClose.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

// Garantir que o modal esteja escondido na carga (fallback JS)
try {
	modal.hidden = true;
	modal.setAttribute('aria-hidden', 'true');
	resultadoEl.hidden = true;
} catch (err) {
	// se algo falhar, não bloquear a execução
}

// fechar com ESC
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape' && !modal.hidden) closeModal();
});

// fechar clicando fora do diálogo
modal.addEventListener('click', (e) => {
	if (e.target === modal) closeModal();
});

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const nome = document.getElementById('nome').value.trim();
	const idade = Number(document.getElementById('idade').value);
	const comMascara = document.getElementById('mascara').value;

	// validações básicas
	if (!nome) {
		resultadoEl.hidden = false;
		resultadoEl.textContent = 'Por favor insira o seu nome.';
		return;
	}
	if (!Number.isFinite(idade) || idade < 0) {
		resultadoEl.hidden = false;
		resultadoEl.textContent = 'Por favor insira uma idade válida.';
		return;
	}

	// formatar nome
	const usuarioFormatado = nome.charAt(0).toUpperCase() + nome.slice(1);

	const isConvidado = listaConvidados.includes(usuarioFormatado);
	const isVIP = convidadosVIP.includes(usuarioFormatado);

	const podeEntrar = ((idade >= 18 && comMascara === 'sim' && isConvidado) || isVIP);

	resultadoEl.hidden = false;
	if (podeEntrar) {
		resultadoEl.textContent = `Olá ${usuarioFormatado}, você pode entrar no Carnaval de Máscaras! 🎭`;
		resultadoEl.style.background = '#e6fff0';
		resultadoEl.style.color = '#024a19';
	} else {
		resultadoEl.textContent = `Desculpe ${usuarioFormatado}, você não pode entrar.`;
		resultadoEl.style.background = '#fff0f0';
		resultadoEl.style.color = '#5a0b0b';
	}
});


