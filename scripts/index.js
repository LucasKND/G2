// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    
    // Check if on mobile device (using window width as a simple check)
    const isMobile = () => window.innerWidth <= 767.98;
    
    // Check if we need to create the mobile overlay
    if (!document.querySelector('.mobile-menu-overlay') && isMobile()) {
        // Create mobile menu overlay
        const overlay = document.createElement('div');
        overlay.className = 'mobile-menu-overlay';
        
        // Create close button
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-menu';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Create the menu container
        const mobileNav = document.createElement('ul');
        
        // Create menu items - simplified navigation
        const menuItems = [
            { text: 'Sobre nós', href: '#sobre' },
            { text: 'Serviços', href: '#servicos' },
            { text: 'Contato', href: '#contato' }
        ];
        
        // Add items to menu
        menuItems.forEach(item => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = item.href;
            a.textContent = item.text;
            
            li.appendChild(a);
            mobileNav.appendChild(li);
        });
        
        // Assemble the overlay
        overlay.appendChild(closeBtn);
        overlay.appendChild(mobileNav);
        document.body.appendChild(overlay);
        
        // Add event listener to close button
        closeBtn.addEventListener('click', function() {
            overlay.classList.remove('active');
        });
    }
    
    // Get the overlay reference
    const overlay = document.querySelector('.mobile-menu-overlay');
    
    // Toggle mobile menu only if we're on mobile
    if (mobileMenuBtn && overlay) {
        mobileMenuBtn.addEventListener('click', function() {
            if (isMobile()) {
                overlay.classList.add('active');
            }
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (!isMobile() && overlay && overlay.classList.contains('active')) {
            overlay.classList.remove('active');
        }
    });
    
    // Image loading optimization
    const images = document.querySelectorAll('img[data-src]');
    const imgOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px 100px 0px"
    };
    
    const loadImage = (image) => {
        image.setAttribute('src', image.getAttribute('data-src'));
        image.onload = () => {
            image.removeAttribute('data-src');
            image.classList.add('loaded');
        };
    };
    
    if ('IntersectionObserver' in window) {
        const imgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadImage(entry.target);
                    imgObserver.unobserve(entry.target);
                }
            });
        }, imgOptions);
        
        images.forEach(img => imgObserver.observe(img));
    } else {
        images.forEach(img => loadImage(img));
    }
    
    // Handle scroll animations
    const animateOnScroll = function() {
        // Elements to animate
        const elements = {
            vantagens: document.querySelector('.vantagens'),
            logosClientes: document.querySelector('.logos-clientes'),
            servicoCard: document.querySelectorAll('.servico-card')
        };
        
        // Check if element is in viewport
        const isInViewport = function(element) {
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
            );
        };
        
        // Add show class for animation
        if (elements.vantagens && isInViewport(elements.vantagens) && !elements.vantagens.classList.contains('show')) {
            elements.vantagens.classList.add('show');
        }
        
        if (elements.logosClientes && isInViewport(elements.logosClientes) && !elements.logosClientes.classList.contains('show')) {
            elements.logosClientes.classList.add('show');
        }
        
        // Animate service cards with delay
        if (elements.servicoCard.length) {
            elements.servicoCard.forEach((card, index) => {
                if (isInViewport(card) && !card.classList.contains('animated')) {
                    setTimeout(() => {
                        card.classList.add('animated');
                        card.style.opacity = 1;
                        card.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }
    };
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial check for elements in viewport
    animateOnScroll();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (overlay.classList.contains('active')) {
                overlay.classList.remove('active');
            }
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize service cards
    const serviceCards = document.querySelectorAll('.servico-card');
    serviceCards.forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Check image loading
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
        animateOnScroll();
    });
});
