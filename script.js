document.addEventListener("DOMContentLoaded", function () {
    // Top Navbar Sticky Effect
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
            navbar.style.boxShadow = "var(--shadow-md)";
            navbar.style.padding = "10px 0";
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.backdropFilter = "blur(10px)";
            navbar.style.webkitBackdropFilter = "blur(10px)";
        } else {
            navbar.style.boxShadow = "var(--shadow-sm)";
            navbar.style.padding = "20px 0";
            navbar.style.background = "var(--white)";
            navbar.style.backdropFilter = "none";
            navbar.style.webkitBackdropFilter = "none";
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // Prevent following the # link if clicked on mobile just to open menu
                if (e.target.tagName.toLowerCase() === 'a' && e.target.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    this.classList.toggle('active');
                }
            }
        });
    });

    // Scroll Fade Animations
    const fadeElements = document.querySelectorAll(".fade-in-section");
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth Scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = mobileBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Appointment Form to WhatsApp Handler
    const appointmentForms = document.querySelectorAll('.appointment-form');
    
    appointmentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[name="name"]').value;
            const age = this.querySelector('input[name="age"]').value;
            const gender = this.querySelector('select[name="gender"]').value;
            const phone = this.querySelector('input[name="phone"]').value;
            const date = this.querySelector('input[name="date"]').value;
            const time = this.querySelector('input[name="time"]').value;
            
            // Handle Treatment Dropdown or hidden field if on a specific subpage
            const treatmentEl = this.querySelector('select[name="treatment"]') || this.querySelector('input[name="treatment"]');
            const treatment = treatmentEl ? treatmentEl.value : 'General Consultation';
            
            const msgEl = this.querySelector('textarea[name="message"]');
            const message = msgEl ? msgEl.value : 'None';
            
            const whatsappNumber = "918332945014"; 
            
            let text = `*New Appointment Request*\n`;
            text += `--------------------------\n`;
            text += `*Patient Name:* ${name}\n`;
            text += `*Age:* ${age}\n`;
            text += `*Gender:* ${gender}\n`;
            text += `*Mobile:* ${phone}\n`;
            text += `*Treatment Selected:* ${treatment}\n`;
            text += `*Date:* ${date}\n`;
            text += `*Time:* ${time}\n`;
            text += `*Message:* ${message}\n`;
            
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });
});
