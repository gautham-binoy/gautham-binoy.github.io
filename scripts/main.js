document.addEventListener('DOMContentLoaded', () => {

    // --- CUSTOM CURSOR LOGIC ---
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

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
    
    // --- CERTIFICATES GRID & LIGHTBOX SETUP ---
    const certificatesGrid = document.getElementById('certificates-grid');
    if (certificatesGrid) {
        certificates.forEach((cert, index) => {
            const certThumb = `
                <div class="cert-thumb hover-target" data-index="${index}">
                    <img src="${cert.image}" alt="${cert.title}" loading="lazy">
                </div>
            `;
            certificatesGrid.innerHTML += certThumb;
        });
    }
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    let currentCertIndex = 0;

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
    
    certificatesGrid.addEventListener('click', e => {
        const thumb = e.target.closest('.cert-thumb');
        if (thumb) openLightbox(parseInt(thumb.dataset.index, 10));
    });
    
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', () => openLightbox((currentCertIndex + 1) % certificates.length));
    lightboxPrev.addEventListener('click', () => openLightbox((currentCertIndex - 1 + certificates.length) % certificates.length));
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => {
        if (!lightbox.classList.contains('show')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') openLightbox((currentCertIndex + 1) % certificates.length);
        if (e.key === 'ArrowLeft') openLightbox((currentCertIndex - 1 + certificates.length) % certificates.length);
    });

    // --- SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
    
    // --- 3D TILT INITIALIZATION ---
    VanillaTilt.init(document.querySelectorAll(".bento-box"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.1,
        perspective: 1000,
        scale: 1.01
    });

});