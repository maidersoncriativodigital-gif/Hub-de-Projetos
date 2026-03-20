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
        });