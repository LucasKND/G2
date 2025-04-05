document.addEventListener('DOMContentLoaded', function() {
    // Process section animations
    const processSteps = document.querySelectorAll('.process-step');
    
    const observeProcess = function() {
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
        
        processSteps.forEach(step => {
            observer.observe(step);
        });
    };
    
    observeProcess();
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open the clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current testimonial and activate its dot
        testimonials[index].style.display = 'block';
        dots[index].classList.add('active');
    }
    
    // Initialize slider
    showTestimonial(currentIndex);
    
    // Event listeners for controls
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? testimonials.length - 1 : currentIndex - 1;
            showTestimonial(currentIndex);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === testimonials.length - 1) ? 0 : currentIndex + 1;
            showTestimonial(currentIndex);
        });
    }
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            showTestimonial(currentIndex);
        });
    });
    
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
        
        // Create menu items for services page
        const menuItems = [
            { text: 'Home', href: '../index.html' },
            { text: 'Sobre nós', href: '../index.html#sobre' },
            { text: 'Serviços', href: '#' },
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
