document.addEventListener('DOMContentLoaded', function() {
    // Timeline animations
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observeTimeline = function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('show');
                    }, index * 200);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    };
    
    observeTimeline();
    
    // Animate stats counter
    const statsNumbers = document.querySelectorAll('.stat-number');
    let animated = false;
    
    function animateStats() {
        if (animated) return;
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animated = true;
                statsNumbers.forEach(stat => {
                    const targetNumber = parseInt(stat.getAttribute('data-count'));
                    let currentNumber = 0;
                    const increment = targetNumber > 100 ? 5 : 1;
                    const duration = 2000; // 2 seconds
                    const steps = Math.ceil(targetNumber / increment);
                    const stepTime = duration / steps;
                    
                    const counter = setInterval(() => {
                        currentNumber += increment;
                        
                        if (currentNumber > targetNumber) {
                            currentNumber = targetNumber;
                            clearInterval(counter);
                        }
                        
                        stat.textContent = currentNumber;
                    }, stepTime);
                });
                
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        if (document.querySelector('.stats-section')) {
            observer.observe(document.querySelector('.stats-section'));
        }
    }
    
    animateStats();
    
    // Mobile menu functionality - using a shared approach with index.js
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
        
        // Create menu items for about page
        const menuItems = [
            { text: 'Home', href: '../index.html' },
            { text: 'Sobre nós', href: '#' },
            { text: 'Serviços', href: 'services.html' },
            { text: 'Contato', href: '../index.html#contato' }
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
});
