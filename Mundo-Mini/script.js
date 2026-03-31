document.addEventListener('DOMContentLoaded', () => {
            // Animação de Scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

            // Lógica do Formulário
            const form = document.querySelector('.form-estudio');
            const msg = document.getElementById('form-msg');

            if(form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const btn = form.querySelector('button');
                    btn.disabled = true;
                    btn.innerText = "Enviando...";
                    
                    try {
                        const res = await fetch(form.action, {
                            method: 'POST',
                            body: new FormData(form),
                            headers: { 'Accept': 'application/json' }
                        });
                        if(res.ok) {
                            msg.innerText = "Mensagem enviada! Entraremos em contacto em breve.";
                            msg.style.color = "#4ade80";
                            form.reset();
                        }
                    } catch {
                        msg.innerText = "Erro ao enviar. Tente novamente mais tarde.";
                        msg.style.color = "#f87171";
                    } finally {
                        btn.disabled = false;
                        btn.innerText = "Enviar Mensagem";
                    }
                });
            }
        });