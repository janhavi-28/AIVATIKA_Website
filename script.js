document.addEventListener('DOMContentLoaded', () => {
    // 1. Client Logo Ticker
    const companies = [
        "AUREUS LOANS", "HELIX HEALTH", "ORBITAL CARGO", "NEXUS PAY", 
        "VELOCITY AUTO", "QUANTUM LOGISTICS", "LUMINA TECH", "SENTINEL SEC"
    ];

    const createTickerContent = () => {
        let content = '';
        companies.forEach(company => {
            content += `
                <div class="client-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 2L2 22h20L12 2z"></path>
                    </svg>
                    ${company}
                </div>
            `;
        });
        return content;
    };

    const ticker1 = document.getElementById('ticker1');
    const ticker2 = document.getElementById('ticker2');

    if (ticker1 && ticker2) {
        // Populate both tickers with the same content for infinite scroll
        const content = createTickerContent() + createTickerContent(); // double it to ensure it fills the screen
        ticker1.innerHTML = content;
        ticker2.innerHTML = content;
    }

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, {
        root: null,
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
