// Portal Mágico - lógica separada em script.js
const btnAtivar = document.getElementById('ativar');
const mensagemEl = document.getElementById('mensagem');
const portalImg = document.querySelector('img.efeito');

const elements = {
	fogo: {
		color: 'radial-gradient(ellipse at center, rgba(255,84,0,0.18), rgba(45,8,0,0.3)), linear-gradient(180deg, #2b0b00, #120300)',
		image: 'https://img.freepik.com/fotos-gratis/personagem-de-estilo-anime-com-fogo-e-chamas_23-2151152391.jpg?w=360',
		messageTitle: 'Bem-vindo ao Reino das Chamas!',
		messageText: "Pelas brasas ardentes do portal, a energia da intuição e do vigor te convida. Queime o que não serve mais e renasça na luz do fogo eterno."
	},
	agua: {
		color: 'radial-gradient(ellipse at center, rgba(0,140,255,0.12), rgba(0,10,40,0.28)), linear-gradient(180deg, #001f3f, #001125)',
		image: 'https://img.freepik.com/fotos-gratis/vista-da-vida-marinha-subaquatica-em-estilo-de-desenho-animado_23-2151120339.jpg?semt=ais_hybrid&w=740&q=80',
		messageTitle: 'Bem-vindo ao Reino dos Mares!',
		messageText: "Deixe a gravidade do mundo material para trás. Nas correntes do portal, a fluidez das emoções te envolve."
	},
	vento: {
		color: 'radial-gradient(ellipse at center, rgba(180,255,255,0.08), rgba(10,20,40,0.24)), linear-gradient(180deg, #071025, #021018)',
		image: 'https://pikaso.cdnpk.net/private/production/3738203718/render.jpg?token=exp=1774742400~hmac=13c681678f80ea6ca56179af19352534da41cd536840eb04ee16856893643145&preview=1&w=340',
		messageTitle: 'Bem-vindo ao Reino dos Céus!',
		messageText: "O vento sussurra segredos antigos. Sinta a liberdade do ar e permita que novas ideias elevem seu espírito."
	},
	terra: {
		color: 'radial-gradient(ellipse at center, rgba(120,200,90,0.08), rgba(6,20,6,0.24)), linear-gradient(180deg, #05230a, #03150a)',
		image: 'https://png.pngtree.com/thumb_back/fh260/background/20241013/pngtree-forest-trees-anime-visual-novel-game-nature-plant-and-in-a-image_16352340',
		messageTitle: 'Bem-vindo ao Reino das Florestas!',
		messageText: "Pela rocha sólida e a terra fértil, o portal se manifesta. Encontre sua base nas raízes profundas deste reino."
	}
};

function applyElement(key){
	const el = elements[key];
	if(!el) return;
	document.body.style.background = el.color;
	portalImg.style.opacity = 0;

	// Tentamos carregar a imagem externa; se falhar, geramos uma imagem via canvas
	function setPortalSrc(src){
		portalImg.src = src;
		portalImg.alt = key + ' portal image';
		portalImg.style.opacity = 1;
	}

	// Para vento/terra preferimos gerar arte procedural para garantir carregamento
	if (key === 'vento' || key === 'terra'){
		const dataUrl = generateElementDataURL(key, 1200, 720);
		setTimeout(()=> setPortalSrc(dataUrl), 360);
	} else {
		// tenta carregar a imagem externa e em caso de erro usa fallback gerado
		const imgTest = new Image();
		imgTest.crossOrigin = 'anonymous';
		imgTest.onload = () => { setTimeout(()=> setPortalSrc(el.image), 360); };
		imgTest.onerror = () => {
			const dataUrl = generateElementDataURL(key, 1200, 720);
			setTimeout(()=> setPortalSrc(dataUrl), 360);
		};
		try { imgTest.src = el.image; }
		catch(e){ const dataUrl = generateElementDataURL(key, 1200, 720); setTimeout(()=> setPortalSrc(dataUrl), 360); }
	}

	alert(el.messageTitle);
	mensagemEl.textContent = el.messageText;
}

/**
 * Gera uma imagem em dataURL representando cada elemento (vento/terra/fallback)
 * retorna um dataURL PNG
 */
function generateElementDataURL(key, width = 1200, height = 720){
	const canvas = document.createElement('canvas');
	canvas.width = width;
	canvas.height = height;
	const ctx = canvas.getContext('2d');

	// Fallback background
	if (key === 'vento'){
		// céu noturno com camadas de faixas de ar, partículas e brilhos sutis
		const bg = ctx.createLinearGradient(0,0,0,height);
		bg.addColorStop(0, '#051026');
		bg.addColorStop(1, '#011017');
		ctx.fillStyle = bg;
		ctx.fillRect(0,0,width,height);

		// função para desenhar fitas fluidas (ribbons)
		function drawRibbon(offsetY, amplitude, thickness, hue, opacity, curl){
			ctx.lineWidth = thickness;
			ctx.strokeStyle = `hsla(${hue}, 100%, 75%, ${opacity})`;
			ctx.beginPath();
			const startX = -100;
			ctx.moveTo(startX, offsetY);
			const steps = 6;
			for(let i=1;i<=steps;i++){
				const x = (i/steps) * (width + 200) - 100;
				const wobble = Math.sin((i + curl) * 0.9) * amplitude * (1 - i/steps*0.7);
				const y = offsetY + wobble + Math.cos(i*0.6 + curl) * 8;
				ctx.lineTo(x, y);
			}
			ctx.stroke();
		}

		// várias fitas com blend suave
		ctx.globalCompositeOperation = 'lighter';
		for(let r=0;r<7;r++){
			drawRibbon(80 + r*70, 30 + r*6, 4 + r*1.2, 190 - r*6, 0.06 + r*0.06, r*0.7);
		}
		ctx.globalCompositeOperation = 'source-over';

		// Camada de nuvens translúcidas com blur (simulado com múltiplas elipses)
		for(let c=0;c<18;c++){
			const cx = Math.random()*width;
			const cy = 40 + Math.random()*(height*0.7);
			const rx = 80 + Math.random()*260;
			const ry = 20 + Math.random()*80;
			ctx.beginPath();
			ctx.ellipse(cx, cy, rx, ry, Math.random()*Math.PI, 0, Math.PI*2);
			ctx.fillStyle = `rgba(200,245,255,${0.02 + Math.random()*0.06})`;
			ctx.fill();
		}

		// partículas finas e faíscas de luz
		for(let i=0;i<260;i++){
			const x = Math.random()*width;
			const y = Math.random()*height;
			const s = Math.random()*2.2;
			ctx.fillStyle = `rgba(180,255,255,${0.03 + Math.random()*0.15})`;
			ctx.fillRect(x, y, s, s);
		}

		// textura sutil com linhas diagonais
		ctx.save();
		ctx.globalAlpha = 0.03;
		ctx.strokeStyle = '#aeefff';
		ctx.lineWidth = 1;
		for(let x= -width; x < width*2; x += 24){
			ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + width, height); ctx.stroke();
		}
		ctx.restore();

		// leve vinheta
		const vg = ctx.createRadialGradient(width/2, height/2, width*0.2, width/2, height/2, Math.max(width,height));
		vg.addColorStop(0, 'rgba(255,255,255,0)');
		vg.addColorStop(1, 'rgba(0,0,10,0.45)');
		ctx.fillStyle = vg; ctx.fillRect(0,0,width,height);

	} else if (key === 'terra'){
		// fundo terroso com gradiente profundo
	const bg2 = ctx.createLinearGradient(0,0,0,height);
	bg2.addColorStop(0, '#062513');
		bg2.addColorStop(1, '#041009');
		ctx.fillStyle = bg2;
		ctx.fillRect(0,0,width,height);

		// desenha múltiplas camadas de terreno com texturas
		function texturedHill(y, amp, color, seed){
			ctx.beginPath();
			ctx.moveTo(0, y);
			const points = 18;
			for(let i=1;i<=points;i++){
				const x = (i/points) * width;
				const noise = Math.sin((i+seed)*0.6) * (amp*0.6) + (Math.random()-0.5)*amp*0.3;
				ctx.lineTo(x, y - noise);
			}
			ctx.lineTo(width, height);
			ctx.lineTo(0, height);
			ctx.closePath();
			ctx.fillStyle = color;
			ctx.fill();
		}

		texturedHill(height*0.72, 90, '#0f3d19', 2);
		texturedHill(height*0.60, 60, '#164e20', 5);
		texturedHill(height*0.82, 140, '#0a2510', 8);

		// detalhes de solo: pequenos pontos e manchas para textura
		for(let i=0;i<1600;i++){
			const x = Math.random()*width;
			const y = height*0.55 + Math.random()*height*0.45;
			const alpha = 0.03 + Math.random()*0.06;
			ctx.fillStyle = `rgba(60,120,80,${alpha})`;
			ctx.fillRect(x, y, 1, 1);
		}

		// árvores mais detalhadas em camadas
		function drawTree(cx, cy, scale){
			// tronco
			ctx.fillStyle = '#5a331f';
			ctx.fillRect(cx-4*scale, cy, 8*scale, 40*scale);
			// copas com sobreposição
			ctx.beginPath(); ctx.fillStyle = `rgba(45,140,70,0.95)`; ctx.ellipse(cx, cy-10*scale, 28*scale, 34*scale, 0, 0, Math.PI*2); ctx.fill();
			ctx.beginPath(); ctx.fillStyle = `rgba(60,170,90,0.85)`; ctx.ellipse(cx-10*scale, cy-28*scale, 22*scale, 20*scale, -0.2, 0, Math.PI*2); ctx.fill();
			ctx.beginPath(); ctx.fillStyle = `rgba(40,120,60,0.9)`; ctx.ellipse(cx+12*scale, cy-30*scale, 18*scale, 16*scale, 0.4, 0, Math.PI*2); ctx.fill();
		}

		for(let t=0;t<12;t++){
			const tx = 40 + Math.random()*(width-80);
			const ty = height*0.55 + Math.random()*height*0.35;
			const sc = 0.6 + Math.random()*1.2;
			drawTree(tx, ty, sc);
		}

		// partículas de pó/folhas
		for(let i=0;i<260;i++){
			const x = Math.random()*width;
			const y = height*0.55 + Math.random()*height*0.45;
			ctx.fillStyle = `rgba(220,255,200,${0.02+Math.random()*0.06})`;
			ctx.fillRect(x, y, 1 + Math.random()*2, 1 + Math.random()*2);
		}

		// brilho suave do topo
		const lg = ctx.createRadialGradient(width*0.5, height*0.3, 10, width*0.5, height*0.3, width*0.9);
		lg.addColorStop(0, 'rgba(180,230,180,0.05)'); lg.addColorStop(1, 'rgba(0,0,0,0)');
		ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = lg; ctx.fillRect(0,0,width,height); ctx.globalCompositeOperation = 'source-over';

	} else {
		// fallback neutro
		ctx.fillStyle = '#022';
		ctx.fillRect(0,0,width,height);
		ctx.fillStyle = '#7afcff';
		ctx.font = '48px serif';
		ctx.fillText(key || 'element', 40, 80);
	}

	return canvas.toDataURL('image/png');
}

function normalizeInput(raw){
	if (raw === null) return null;
	return raw.trim().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
}

/* Modal handling */
function openWordModal(){
	if (document.getElementById('word-modal')) { document.getElementById('word-modal').hidden = false; document.getElementById('magic-word').focus(); document.body.classList.add('no-scroll'); return; }

	const modal = document.createElement('div');
	modal.id = 'word-modal';
	modal.className = 'modal open';
	modal.innerHTML = `<div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="word-title" tabindex="-1">
		<button class="modal-close" aria-label="Fechar">×</button>
		<h3 id="word-title">Palavra Mágica</h3>
		<p>Digite a palavra mágica para ativar o portal (fogo, agua, vento, terra)</p>
		<input id="magic-word" type="text" placeholder="Digite a palavra" />
		<div class="modal-actions">
			<button class="btn btn-primary" id="word-ok">Entrar</button>
			<button class="btn btn-secondary" id="word-cancel">Cancelar</button>
		</div>
	</div>`;
	document.body.appendChild(modal);
	document.body.classList.add('no-scroll');

	const input = document.getElementById('magic-word');
	const ok = document.getElementById('word-ok');
	const cancel = document.getElementById('word-cancel');
	const closeBtn = modal.querySelector('.modal-close');
	const dialog = modal.querySelector('.modal-dialog');

	input.focus();

	ok.addEventListener('click', () => {
		const val = normalizeInput(input.value);
		if (!val) { alert('Por favor insira uma palavra.'); input.focus(); return; }
		closeWordModal();
		if (['fogo','agua','vento','terra'].includes(val)) applyElement(val);
		else alert('Palavra Mágica errada!');
	});

	cancel.addEventListener('click', () => { closeWordModal(); });
	closeBtn.addEventListener('click', () => { closeWordModal(); });
	modal.addEventListener('click', (e) => { if (e.target === modal) closeWordModal(); });

	function escHandler(e){ if (e.key === 'Escape') closeWordModal(); }
	function trap(e){ if (e.key !== 'Tab') return; const focusable = dialog.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'); const first = focusable[0]; const last = focusable[focusable.length-1]; if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } } else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } } }

	document.addEventListener('keydown', escHandler);
	dialog.addEventListener('keydown', trap);

	modal._esc = escHandler; modal._trap = trap;
}

function closeWordModal(){
	const m = document.getElementById('word-modal');
	if (!m) return;
	if (m._esc) document.removeEventListener('keydown', m._esc);
	const dialog = m.querySelector('.modal-dialog');
	if (m._trap) dialog.removeEventListener('keydown', m._trap);
	m.classList.remove('open');
	setTimeout(()=>{ try { m.remove(); } catch(e) { m.hidden = true } }, 260);
	document.body.classList.remove('no-scroll');
}

btnAtivar.addEventListener('click', openWordModal);

