document.addEventListener('DOMContentLoaded', () => {

    // --- DATA ---
    const certificates = [
        { title: "First Prize - Kryptos Hardware Hackathon", image: "assets/certificates/kryptos.jpg" },
        { title: "First Prize - Lumino Tech Fest", image: "assets/certificates/lumino1.jpg" },
        { title: "First Prize - Lumino Tech Fest", image: "assets/certificates/lumino2.jpg" },
        { title: "Flutter App Development Internship", image: "assets/certificates/internship.jpg" },
        { title: "Arduino - IEDC", image: "assets/certificates/arduino_IEDC.jpg" },
        { title: "Arduino - Spoken Tutorial", image: "assets/certificates/arduino_spoketutorial.jpg" },
        { title: "Google Cybersecurity Foundations", image: "assets/certificates/foundations_of_cybersecurity_google.jpg" },
        { title: "HTML - Spoken Tutorial", image: "assets/certificates/html_spokentutorial.jpg" },
        { title: "Java - Spoken Tutorial", image: "assets/certificates/java_spokentutorial.jpg" },
        { title: "PHP & MySQL - Spoken Tutorial", image: "assets/certificates/php_&_mysql_spokentutorial.jpg" },
        { title: "Python - Spoken Tutorial", image: "assets/certificates/python_spokentutorial.jpg" }
    ];

    // --- CERTIFICATE GRID & LIGHTBOX SETUP ---
    const certificatesGrid = document.getElementById('certificates-grid');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    let currentCertIndex = 0;

    if (certificatesGrid) {
        certificates.forEach((cert, index) => {
            const certCardHTML = `
                <div class="cert-card" data-index="${index}">
                    <div class="cert-image-wrapper">
                        <img src="${cert.image}" alt="${cert.title}" class="cert-image" loading="lazy">
                    </div>
                    <div class="cert-info">
                        <h3>${cert.title}</h3>
                        <span class="view-prompt">View Certificate <i class="fas fa-arrow-right"></i></span>
                    </div>
                </div>
            `;
            certificatesGrid.innerHTML += certCardHTML;
        });
    }

    // --- LIGHTBOX FUNCTIONS ---
    function openLightbox(index) {
        if (index < 0 || index >= certificates.length) return;
        currentCertIndex = index;
        const cert = certificates[currentCertIndex];
        
        lightboxImg.src = cert.image;
        lightboxTitle.textContent = cert.title;
        
        lightbox.classList.add('show');
        document.body.classList.add('lightbox-open');
    }

    function closeLightbox() {
        lightbox.classList.remove('show');
        document.body.classList.remove('lightbox-open');
    }

    function showNext() {
        const nextIndex = (currentCertIndex + 1) % certificates.length;
        openLightbox(nextIndex);
    }

    function showPrev() {
        const prevIndex = (currentCertIndex - 1 + certificates.length) % certificates.length;
        openLightbox(prevIndex);
    }

    // --- LIGHTBOX EVENT LISTENERS ---
    certificatesGrid.addEventListener('click', e => {
        const card = e.target.closest('.cert-card');
        if (card) {
            const index = parseInt(card.dataset.index, 10);
            openLightbox(index);
        }
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);

    // Close lightbox if clicking on the background overlay
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox
    document.addEventListener('keydown', e => {
        if (lightbox.classList.contains('show')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
        }
    });


    // --- SCROLL-BASED INTERACTIVITY (UNCHANGED) ---
    const sections = document.querySelectorAll('.fullscreen-section');
    const navDots = document.querySelectorAll('.nav-dot');

    const observerOptions = {
        root: document.getElementById('gta-scroller'),
        threshold: 0.7
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const correspondingDot = document.querySelector(`.nav-dot[data-section="${sectionId}"]`);
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                navDots.forEach(dot => dot.classList.remove('active'));
                if (correspondingDot) correspondingDot.classList.add('active');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));

    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = document.querySelector(dot.getAttribute('href'));
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});