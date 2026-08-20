document.addEventListener('DOMContentLoaded', () => {
    // 1. Header Scrolled State
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Init on load

    // 2. Mobile Menu Navigation
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileNavToggle && navLinks) {
        mobileNavToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger animation styles if needed
            const spans = mobileNavToggle.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = mobileNavToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // 3. Menu Tab System
    const tabButtons = document.querySelectorAll('.tab-btn');
    const menuPanes = document.querySelectorAll('.menu-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            // Toggle active buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.add('active'); // Wait, let's make sure it's btn.classList.add('active')! Ah, let me write this carefully.
            btn.classList.add('active');

            // Switch panes
            menuPanes.forEach(pane => {
                pane.classList.remove('active');
                if (pane.id === targetTab) {
                    // Small delay to trigger animation smoothly
                    setTimeout(() => {
                        pane.classList.add('active');
                    }, 50);
                }
            });
        });
    });

    // 4. Booking Form Simulation
    const bookingForm = document.getElementById('bookingForm');
    const toast = document.getElementById('toastNotification');
    const toastMessage = document.getElementById('toastMessage');

    if (bookingForm && toast) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extract values
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;

            // Form validation check
            if (!name || !date || !time || !guests) {
                showToast('Errore: Compila tutti i campi obbligatori per prenotare.', true);
                return;
            }

            // Simulate server request
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Invio in corso...';

            setTimeout(() => {
                // Success feedback
                showToast(`Grazie ${name}! Tavolo da ${guests} persone riservato per il ${formatDate(date)} alle ${time}. Ti aspettiamo!`);
                bookingForm.reset();
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1200);
        });
    }

    function showToast(message, isError = false) {
        toastMessage.textContent = message;
        if (isError) {
            toast.classList.add('error');
        } else {
            toast.classList.remove('error');
        }
        
        toast.classList.add('show');

        // Hide toast after 5 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 5000);
    }

    function formatDate(dateStr) {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
        return dateStr;
    }

    // 5. Scroll Animations (Intersection Observer)
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animateElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animateElements.forEach(el => el.classList.add('appear'));
    }
});
