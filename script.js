// Ensure page starts at top on load and prevent hash scrolling
window.addEventListener('load', () => {
    // Scroll to top immediately
    window.scrollTo(0, 0);
    // Clear any hash from URL without scrolling
    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }
});

// Prevent default hash scrolling behavior
window.addEventListener('DOMContentLoaded', () => {
    // If there's a hash in the URL, remove it and scroll to top
    if (window.location.hash) {
        window.scrollTo(0, 0);
        history.replaceState(null, null, window.location.pathname + window.location.search);
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            // Update URL hash without scrolling
            history.pushState(null, null, this.getAttribute('href'));
        }
    });
});

// Navbar is transparent - no background color changes needed

// Projects section carousel navigation
const projectsSection = document.querySelector('.projects-section');
const projectSlides = document.querySelectorAll('.project-slide');
const navDots = document.querySelectorAll('.nav-dot');
const leftArrow = document.querySelector('.project-arrow-left');
const rightArrow = document.querySelector('.project-arrow-right');

let currentProjectIndex = 0;

function showProject(index) {
    // Remove all classes from slides
    projectSlides.forEach((slide, i) => {
        slide.classList.remove('active', 'prev', 'next');
        
        if (i < index) {
            slide.classList.add('prev');
        } else if (i > index) {
            slide.classList.add('next');
        }
    });
    
    // Remove active class from all dots
    navDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (projectSlides[index]) {
        projectSlides[index].classList.add('active');
    }
    if (navDots[index]) {
        navDots[index].classList.add('active');
    }
    
    currentProjectIndex = index;
    updateArrows();
}

function nextProject() {
    const nextIndex = (currentProjectIndex + 1) % projectSlides.length;
    showProject(nextIndex);
}

function prevProject() {
    const prevIndex = (currentProjectIndex - 1 + projectSlides.length) % projectSlides.length;
    showProject(prevIndex);
}

function updateArrows() {
    if (leftArrow && rightArrow) {
        leftArrow.style.opacity = '1';
        rightArrow.style.opacity = '1';
    }
}

// Event listeners for arrows
if (leftArrow) {
    leftArrow.addEventListener('click', prevProject);
}

if (rightArrow) {
    rightArrow.addEventListener('click', nextProject);
}

// Event listeners for nav dots
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showProject(index));
});

// Initialize - set initial states for all slides
if (projectSlides.length > 0) {
    projectSlides.forEach((slide, i) => {
        if (i === 0) {
            slide.classList.add('active');
        } else {
            slide.classList.add('next');
        }
    });
    showProject(0);
}

// Legacy projects section with arrow navigation
const legacyProjectsSection = document.querySelector('.projects');
const projectsScrollContainer = document.querySelector('.projects-scroll-container');

if (projectsSection && projectsScrollContainer) {
    const projectCards = projectsScrollContainer.querySelectorAll('.project-card');
    
    // Get project width (should be viewport width)
    function getProjectWidth() {
        return window.innerWidth;
    }
    
    // Arrow navigation - scroll exactly one project width
    function scrollToNext() {
        const projectWidth = getProjectWidth();
        const currentScroll = projectsScrollContainer.scrollLeft;
        const currentIndex = Math.round(currentScroll / projectWidth);
        const nextIndex = Math.min(currentIndex + 1, projectCards.length - 1);
        const targetScroll = nextIndex * projectWidth;
        
        projectsScrollContainer.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }
    
    function scrollToPrev() {
        const projectWidth = getProjectWidth();
        const currentScroll = projectsScrollContainer.scrollLeft;
        const currentIndex = Math.round(currentScroll / projectWidth);
        const prevIndex = Math.max(currentIndex - 1, 0);
        const targetScroll = prevIndex * projectWidth;
        
        projectsScrollContainer.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }
    
    // Create arrow buttons
    const leftArrow = document.createElement('button');
    leftArrow.className = 'project-arrow project-arrow-left';
    leftArrow.innerHTML = '←';
    leftArrow.setAttribute('aria-label', 'Previous project');
    leftArrow.addEventListener('click', scrollToPrev);
    
    const rightArrow = document.createElement('button');
    rightArrow.className = 'project-arrow project-arrow-right';
    rightArrow.innerHTML = '→';
    rightArrow.setAttribute('aria-label', 'Next project');
    rightArrow.addEventListener('click', scrollToNext);
    
    projectsSection.appendChild(leftArrow);
    projectsSection.appendChild(rightArrow);
    
    // Update arrow visibility based on scroll position
    function updateArrows() {
        const projectWidth = getProjectWidth();
        const scrollLeft = projectsScrollContainer.scrollLeft;
        const maxScroll = projectsScrollContainer.scrollWidth - projectsScrollContainer.clientWidth;
        const currentIndex = Math.round(scrollLeft / projectWidth);
        
        leftArrow.style.opacity = currentIndex > 0 ? '1' : '0.3';
        leftArrow.style.pointerEvents = currentIndex > 0 ? 'auto' : 'none';
        
        rightArrow.style.opacity = currentIndex < projectCards.length - 1 ? '1' : '0.3';
        rightArrow.style.pointerEvents = currentIndex < projectCards.length - 1 ? 'auto' : 'none';
    }
    
    projectsScrollContainer.addEventListener('scroll', updateArrows);
    window.addEventListener('resize', updateArrows);
    updateArrows();
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Typing animation function - types both lines simultaneously
function typeText(element, text, speed = 50) {
    element.innerHTML = '';
    element.style.opacity = '1';
    
    // Handle HTML entity for newline and split text into lines
    const normalizedText = text.replace(/&#10;/g, '\n').replace(/\r\n/g, '\n');
    const lines = normalizedText.split('\n');
    if (lines.length === 0) return;
    
    // Create arrays for each line's characters
    const lineChars = lines.map(line => line.split(''));
    const maxLength = Math.max(...lineChars.map(line => line.length));
    
    let charIndex = 0;
    let line1HTML = '';
    let line2HTML = '';
    
    function type() {
        if (charIndex < maxLength) {
            // Type character on line 1 if available
            if (charIndex < lineChars[0].length) {
                line1HTML += lineChars[0][charIndex];
            }
            
            // Type character on line 2 if available
            if (lineChars.length > 1 && charIndex < lineChars[1].length) {
                line2HTML += lineChars[1][charIndex];
            }
            
            // Update element with both lines
            element.innerHTML = line1HTML + (line2HTML ? '<br>' + line2HTML : '');
            
            charIndex++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            element.classList.remove('typing-active');
        }
    }
    
    element.classList.add('typing-active');
    type();
}

// Typing animation observer for about section
const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const typingTexts = entry.target.querySelectorAll('.typing-text');
            typingTexts.forEach((typingText, index) => {
                if (!typingText.dataset.typed && typingText.dataset.text) {
                    typingText.dataset.typed = 'true';
                    // Stagger the animations
                    setTimeout(() => {
                        typeText(typingText, typingText.dataset.text, 50);
                    }, index * 200);
                }
            });
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px'
});

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.about-section, .skills, .projects, .contact');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Observe about section for typing animation
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        typingObserver.observe(aboutSection);
    }

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
});

// Music waves animation pause on scroll (performance)
let isScrollingWaves = false;
window.addEventListener('scroll', () => {
    if (!isScrollingWaves) {
        isScrollingWaves = true;
        const waves = document.querySelectorAll('.wave');
        waves.forEach(wave => {
            wave.style.animationPlayState = 'paused';
        });
        
        setTimeout(() => {
            isScrollingWaves = false;
            waves.forEach(wave => {
                wave.style.animationPlayState = 'running';
            });
        }, 100);
    }
}, { passive: true });

// Skill tags hover effect enhancement
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) translateY(-2px)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
    });
});

// Add active state to navigation based on scroll position
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = document.querySelectorAll('section[id]');
const navbar = document.querySelector('.navbar');

function highlightNavigation() {
    if (!navbar) return;
    
    const scrollY = window.pageYOffset || window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navbarHeight = navbar.offsetHeight;
        
        if (scrollY >= sectionTop - navbarHeight - 100 && scrollY < sectionTop + sectionHeight - navbarHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation, { passive: true });

// Add active class styling via CSS
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--color-text-primary) !important;
    }
    .nav-menu a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Contact Form Validation and Submission
const contactForm = document.getElementById('contact-form');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('email-error');
const formMessage = document.getElementById('form-message');

// Email validation function
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Real-time email validation
if (emailInput) {
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.classList.add('show');
            this.style.borderColor = '#d32f2f';
        } else {
            emailError.classList.remove('show');
            this.style.borderColor = '';
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.style.borderColor === 'rgb(211, 47, 47)') {
            const email = this.value.trim();
            if (validateEmail(email)) {
                emailError.classList.remove('show');
                this.style.borderColor = '';
            }
        }
    });
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validate all fields
        if (!name || !email || !subject || !message) {
            formMessage.textContent = 'Please fill in all fields';
            formMessage.classList.add('show', 'error');
            return;
        }
        
        // Validate email
        if (!validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.classList.add('show');
            emailInput.style.borderColor = '#d32f2f';
            emailInput.focus();
            return;
        }
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('.contact-submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Hide previous messages
        formMessage.classList.remove('show', 'success', 'error');
        
        try {
            // Using Formspree for form submission
            // The form will submit to Formspree which will send the email
            // You need to: 
            // 1. Sign up at https://formspree.io/
            // 2. Create a new form
            // 3. Replace 'YOUR_FORM_ID' in the form action with your Formspree form ID
            // 4. Set the recipient email to amyqanguyen@gmail.com in Formspree settings
            
            const formData = new FormData(contactForm);
            
            // Submit to Formspree
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formMessage.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
                formMessage.classList.add('show', 'success');
                contactForm.reset();
                emailError.classList.remove('show');
                emailInput.style.borderColor = '';
            } else {
                const data = await response.json();
                if (data.errors) {
                    formMessage.textContent = data.errors.map(error => error.message).join(', ');
                } else {
                    formMessage.textContent = 'There was an error sending your message. Please try again.';
                }
                formMessage.classList.add('show', 'error');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            formMessage.textContent = 'There was an error sending your message. Please try again or email me directly at amyqanguyen@gmail.com';
            formMessage.classList.add('show', 'error');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
}
