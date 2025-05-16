document.addEventListener('DOMContentLoaded', () => {
    console.log("Mic check, 1, 2... Page loaded!");

    // Set current year in footer
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.getElementById('primary-navigation');

    if (navToggle && primaryNav) {
        navToggle.addEventListener('click', () => {
            const visibility = primaryNav.getAttribute('data-visible');
            if (visibility === "false") {
                primaryNav.setAttribute('data-visible', true);
                navToggle.setAttribute('aria-expanded', true);
                document.body.style.overflowY = 'hidden'; // Prevent scrolling when nav is open
            } else {
                primaryNav.setAttribute('data-visible', false);
                navToggle.setAttribute('aria-expanded', false);
                document.body.style.overflowY = 'auto';
            }
        });

        // Close mobile nav when a link is clicked
        primaryNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (primaryNav.getAttribute('data-visible') === "true") {
                    primaryNav.setAttribute('data-visible', false);
                    navToggle.setAttribute('aria-expanded', false);
                    document.body.style.overflowY = 'auto';
                }
            });
        });
    }


    // Scroll to Top Button
    const scrollToTopButton = document.getElementById('scroll-to-top');
    if (scrollToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show button after scrolling 300px
                scrollToTopButton.classList.add('visible');
            } else {
                scrollToTopButton.classList.remove('visible');
            }
        });
        scrollToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Simple Form Submission Handler (prevents default and logs)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            console.log("Form Data Submitted:");
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
            alert("Thanks for your message! I'll hit you back soon. Peace!"); // Replace with actual submission logic
            contactForm.reset();
        });
    }

    // Animate skill bars when they scroll into view
    const skillItems = document.querySelectorAll('.skill-level');
    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.parentElement.parentElement.querySelector('.skill-level').style.width; // Read from inline style
                 // entry.target.style.animationPlayState = 'running'; // This won't work as expected without re-triggering animation
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    skillItems.forEach(item => {
        // To make IntersectionObserver work with CSS animation, ensure animation isn't auto-playing.
        // We set width via JS on intersect now (using existing inline style). CSS just defines 'animateSkillBar' but doesn't apply it by default.
        // This can be refined further based on specific animation needs.
        // Currently, it just sets the width that CSS transition/animation should animate to.
        // CSS has transition on .skill-level if `animateSkillBar` is not desired or not working with observer approach well
    });


    // Subtle Parallax on Boombox (Hero Section)
    const boombox = document.getElementById('boombox-img');
    const hero = document.getElementById('hero');

    if (boombox && hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            const moveX = (x - rect.width / 2) / (rect.width / 2) * -5; // Max 5px movement
            const moveY = (y - rect.height / 2) / (rect.height / 2) * -3; // Max 3px movement

            boombox.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${moveX * 0.1}deg)`;
        });
        hero.addEventListener('mouseleave', () => {
            boombox.style.transform = `translate(0,0) rotate(0deg)`; // Reset on mouse leave
        });
    }

    // Add scroll-based reveal to sections
    const sectionsToReveal = document.querySelectorAll('.content-section, .hero-content'); // include hero for initial animation
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // observer.unobserve(entry.target); // uncomment if you only want it to animate once
            } else {
                 entry.target.classList.remove('is-visible'); // uncomment to re-animate on scroll up/down
            }
        });
    }, { threshold: 0.1 }); // Start revealing when 10% of section is visible

    sectionsToReveal.forEach(section => {
        revealObserver.observe(section);
        // Add a base class for CSS transition
        if (!section.classList.contains('hero-content')) { // hero-content has its own animation
             section.classList.add('scroll-reveal-base');
        }
    });
});

// Add a bit of CSS for scroll reveal if not already handled
const scrollRevealStyle = document.createElement('style');
scrollRevealStyle.textContent = `
.scroll-reveal-base {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.scroll-reveal-base.is-visible {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(scrollRevealStyle);