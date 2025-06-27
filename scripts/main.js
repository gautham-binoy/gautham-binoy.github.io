document.addEventListener('DOMContentLoaded', () => {

    // --- DATA ---
    // The same certificate data you provided
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

    
    // --- CERTIFICATE GRID GENERATION ---
    const certificatesGrid = document.getElementById('certificates-grid');

    if (certificatesGrid) {
        certificates.forEach(cert => {
            const certCard = `
                <div class="cert-card">
                    <img src="${cert.image}" alt="${cert.title}" class="cert-image" loading="lazy">
                    <div class="cert-info">
                        <h3>${cert.title}</h3>
                        <a href="${cert.image}" target="_blank">View Certificate</a>
                    </div>
                </div>
            `;
            certificatesGrid.innerHTML += certCard;
        });
    }

    
    // --- SCROLL-BASED INTERACTIVITY ---
    const sections = document.querySelectorAll('.fullscreen-section');
    const navDots = document.querySelectorAll('.nav-dot');

    const observerOptions = {
        root: document.getElementById('gta-scroller'), // We observe inside our scrolling container
        rootMargin: '0px',
        threshold: 0.7 // Section is considered "active" when 70% visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const correspondingDot = document.querySelector(`.nav-dot[data-section="${sectionId}"]`);

            if (entry.isIntersecting) {
                // Add 'visible' class to the section for content animations
                entry.target.classList.add('visible');

                // Update active state on nav dots
                navDots.forEach(dot => dot.classList.remove('active'));
                if (correspondingDot) {
                    correspondingDot.classList.add('active');
                }
            } else {
                // Optionally remove the class if you want animations to re-run
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    
    // --- SIDE NAVIGATION CLICK HANDLING ---
    navDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});