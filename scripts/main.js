// Certificate data
const certificates = [
    // Achievements
    {
        id: 1,
        title: "First Prize - Kryptos Hardware Hackathon",
        image: "assets/certificates/kryptos.jpg",
        category: "achievement"
    },
    {
        id: 2,
        title: "First Prize - Lumino Tech Fest",
        image: "assets/certificates/lumino1.jpg",
        category: "achievement"
    },
    {
        id: 3,
        title: "First Prize - Lumino Tech Fest",
        image: "assets/certificates/lumino2.jpg",
        category: "achievement"
    },
    // Internship
    {
        id: 4,
        title: "Flutter App Development Internship",
        image: "assets/certificates/internship.jpg",
        category: "internship"
    },
    // Courses
    {
        id: 5,
        title: "Arduino - IEDC",
        image: "assets/certificates/arduino_IEDC.jpg",
        category: "course"
    },
    {
        id: 6,
        title: "Arduino - Spoken Tutorial",
        image: "assets/certificates/arduino_spoketutorial.jpg",
        category: "course"
    },
    {
        id: 7,
        title: "Google Cybersecurity Foundations",
        image: "assets/certificates/foundations_of_cybersecurity_google.jpg",
        category: "course"
    },
    {
        id: 8,
        title: "HTML - Spoken Tutorial",
        image: "assets/certificates/html_spokentutorial.jpg",
        category: "course"
    },
    {
        id: 9,
        title: "Java - Spoken Tutorial",
        image: "assets/certificates/java_spokentutorial.jpg",
        category: "course"
    },
    {
        id: 10,
        title: "PHP & MySQL - Spoken Tutorial",
        image: "assets/certificates/php_&_mysql_spokentutorial.jpg",
        category: "course"
    },
    {
        id: 11,
        title: "Python - Spoken Tutorial",
        image: "assets/certificates/python_spokentutorial.jpg",
        category: "course"
    }
];

let currentCertIndex = 0;
let filteredCerts = [...certificates];

// Navigation
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Certificate Modal Functions
function openCertificates() {
    const modal = document.getElementById('certificatesModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reset to first certificate
    currentCertIndex = 0;
    filteredCerts = [...certificates];
    showCertificate(0);
    populateThumbnails();
}

function closeCertificates() {
    document.getElementById('certificatesModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function showCertificate(index) {
    if (filteredCerts.length === 0) return;
    
    currentCertIndex = index;
    const cert = filteredCerts[index];
    
    const viewer = document.getElementById('currentCertificate');
    const title = document.getElementById('certTitle');
    
    // Preload image
    const img = new Image();
    img.onload = function() {
        viewer.src = this.src;
        viewer.style.opacity = '1';
    };
    img.src = cert.image;
    
    title.textContent = cert.title;
    
    // Update thumbnails
    document.querySelectorAll('.cert-thumbnail').forEach((thumb, idx) => {
        thumb.classList.toggle('active', idx === index);
    });
}

function nextCertificate() {
    if (filteredCerts.length === 0) return;
    let newIndex = (currentCertIndex + 1) % filteredCerts.length;
    showCertificate(newIndex);
}

function prevCertificate() {
    if (filteredCerts.length === 0) return;
    let newIndex = currentCertIndex - 1;
    if (newIndex < 0) newIndex = filteredCerts.length - 1;
    showCertificate(newIndex);
}

function populateThumbnails() {
    const container = document.getElementById('certThumbnails');
    container.innerHTML = filteredCerts.map((cert, index) => `
        <div class="cert-thumbnail ${index === currentCertIndex ? 'active' : ''}" 
             onclick="showCertificate(${index})">
            <img src="${cert.image}" alt="${cert.title}" loading="lazy">
            <div class="thumb-overlay">
                <span>${cert.title}</span>
            </div>
        </div>
    `).join('');
}

// Filter certificates
document.querySelectorAll('.cert-filter').forEach(button => {
    button.addEventListener('click', () => {
        // Update active filter button
        document.querySelectorAll('.cert-filter').forEach(btn => 
            btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter certificates
        const category = button.dataset.category;
        filteredCerts = category === 'all' 
            ? [...certificates]
            : certificates.filter(cert => cert.category === category);
        
        currentCertIndex = 0;
        if (filteredCerts.length > 0) {
            showCertificate(0);
        }
        populateThumbnails();
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (document.getElementById('certificatesModal').style.display === 'block') {
        if (e.key === 'ArrowRight') nextCertificate();
        if (e.key === 'ArrowLeft') prevCertificate();
        if (e.key === 'Escape') closeCertificates();
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('certificatesModal');
    if (event.target === modal) {
        closeCertificates();
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');
});