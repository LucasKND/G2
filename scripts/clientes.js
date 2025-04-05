document.addEventListener('DOMContentLoaded', function() {
    // Duplicate slides for continuous effect
    function setupInfiniteSlider() {
        const rightTrack = document.querySelector('.slider-container.right .slider-track');
        const leftTrack = document.querySelector('.slider-container.left .slider-track');
        
        if (rightTrack) {
            // Clone the slides for a continuous effect
            const rightSlides = rightTrack.innerHTML;
            rightTrack.innerHTML = rightSlides + rightSlides;
        }
        
        if (leftTrack) {
            // Clone the slides for a continuous effect
            const leftSlides = leftTrack.innerHTML;
            leftTrack.innerHTML = leftSlides + leftSlides;
        }
    }
    
    setupInfiniteSlider();
    
    // Handle animations on scroll
    const observeElements = function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Observe client cards
        document.querySelectorAll('.client-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(card);
        });
        
        // Add show class when elements come into view
        document.querySelectorAll('.client-card.show').forEach(card => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        });
    };
    
    observeElements();
    
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
        
        // Create menu items for clients page
        const menuItems = [
            { text: 'Home', href: '../index.html' },
            { text: 'Sobre nós', href: 'about.html' },
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
