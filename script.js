document.addEventListener('DOMContentLoaded', () => {
            // Observador para revelar elementos ao fazer scroll
            const observerOptions = { threshold: 0.15 };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
            
            // Tornar os cards clicáveis (divs com data-href)
            // Mas permitir que links (<a>) dentro do card sejam ativados normalmente.
            const cards = document.querySelectorAll('.project-card[data-href]');
            cards.forEach(card => {
                card.setAttribute('tabindex', '0');
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    // Se o clique ocorreu num link (ou dentro de um link), deixar o comportamento padrão
                    if (e.target.closest && e.target.closest('a')) return;

                    const href = card.getAttribute('data-href');
                    if (href) window.location.href = href;
                });
                card.addEventListener('keydown', (e) => {
                    // Se o elemento focado for um link dentro do card, não interceptar a tecla
                    const activeIsLink = document.activeElement && document.activeElement.closest && document.activeElement.closest('a');
                    if (activeIsLink) return;

                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const href = card.getAttribute('data-href');
                        if (href) window.location.href = href;
                    }
                });
            });
        });
