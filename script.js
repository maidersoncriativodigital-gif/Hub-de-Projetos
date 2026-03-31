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
            const cards = document.querySelectorAll('.project-card[data-href]');
            cards.forEach(card => {
                card.setAttribute('tabindex', '0');
                card.style.cursor = 'pointer';
                card.addEventListener('click', (e) => {
                    const href = card.getAttribute('data-href');
                    if (href) window.location.href = href;
                });
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        const href = card.getAttribute('data-href');
                        if (href) window.location.href = href;
                    }
                });
            });
        });