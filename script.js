document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = navLinks?.querySelectorAll('a');

    navToggle?.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('nav-links--open');
        navToggle.classList.toggle('nav-toggle--open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navItems?.forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-links--open');
            navToggle.classList.remove('nav-toggle--open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // 2. Application Modal Window Handling
    const modal = document.getElementById("applicationModal");
    const openModalBtns = document.querySelectorAll(".open-modal-btn");
    const closeModalBtn = document.getElementById("closeModalBtn");

    openModalBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            modal.classList.add("active");
            // Prevent body background scrolling when modal context is open
            document.body.style.overflow = "hidden";
        });
    });

    const hideModal = () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    };

    closeModalBtn.addEventListener("click", hideModal);

    // Close modal if user clicks anywhere outside the form container
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            hideModal();
        }
    });

    // 3. Form Submission Handler
    const form = document.getElementById("ambassadorForm");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("fullName").value;
        alert(`Thank you for applying, ${name}! Our developer ecosystem coordination team will be in contact shortly.`);

        form.reset();
        hideModal();
    });

    // 4. Smooth Rolling Number Counters Action
    const counters = document.querySelectorAll(".counter");

    const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const current = +counter.innerText.replace(/[^0-9]/g, ''); // Clear symbols while calculating
            
            // Read custom formatting symbols if they exist
            const appendStr = counter.getAttribute("data-append") || "";
            const prependStr = counter.getAttribute("data-prepend") || "";
            
            // Speed calculation rule
            const increment = Math.ceil(target / 100);
            
            if (current < target) {
                const nextVal = current + increment;
                const finalVal = nextVal > target ? target : nextVal;
                
                // Construct the string with symbols safely
                counter.innerText = `${prependStr}${finalVal.toLocaleString()}${appendStr}`;
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = `${prependStr}${target.toLocaleString()}${appendStr}`;
            }
        };
        updateCount();
    });
};

    // Trigger metrics count animation when section becomes visible in the viewport
    const observerOptions = { threshold: 0.3 };
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const metricsSection = document.getElementById("analytics");
    if (metricsSection) {
        observer.observe(metricsSection);
    }
});