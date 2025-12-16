document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = navLinks.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Initialize aria-expanded attribute
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    }

    // Set dynamic copyright year
    updateCopyrightYear();

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        initFormValidation(contactForm);
    }
});

// Update copyright year dynamically
function updateCopyrightYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Form validation
function initFormValidation(form) {
    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');

    // Real-time validation
    nameInput.addEventListener('blur', () => validateField(nameInput, 'name-error'));
    emailInput.addEventListener('blur', () => validateEmail(emailInput, 'email-error'));
    messageInput.addEventListener('blur', () => validateField(messageInput, 'message-error'));

    // Clear errors on input
    [nameInput, emailInput, messageInput].forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('error');
            const errorId = input.id + '-error';
            const errorElement = document.getElementById(errorId);
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        });
    });

    // Form submission validation
    form.addEventListener('submit', (e) => {
        let isValid = true;

        if (!validateField(nameInput, 'name-error')) isValid = false;
        if (!validateEmail(emailInput, 'email-error')) isValid = false;
        if (!validateField(messageInput, 'message-error')) isValid = false;

        if (!isValid) {
            e.preventDefault();
        }
    });
}

function validateField(input, errorId) {
    const errorElement = document.getElementById(errorId);
    const value = input.value.trim();

    if (value === '') {
        input.classList.add('error');
        if (errorElement) {
            errorElement.classList.add('show');
        }
        return false;
    }

    input.classList.remove('error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    return true;
}

function validateEmail(input, errorId) {
    const errorElement = document.getElementById(errorId);
    const value = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '' || !emailRegex.test(value)) {
        input.classList.add('error');
        if (errorElement) {
            errorElement.classList.add('show');
        }
        return false;
    }

    input.classList.remove('error');
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    return true;
}
