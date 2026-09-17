// =========================================
// NETFLIX CLONE PORTFOLIO SCRIPTS
// =========================================

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
  // --- Navbar Scroll Effect ---
  const navbar = document.getElementById('navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Horizontal Slider Controls ---
  const sliderBtns = document.querySelectorAll('.slider-btn');
  
  sliderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Find the sibling row-container
      const container = e.target.closest('.slider-wrapper').querySelector('.row-container');
      const containerWidth = container.offsetWidth;
      
      if (btn.classList.contains('left')) {
        container.scrollBy({ left: -containerWidth * 0.8, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: containerWidth * 0.8, behavior: 'smooth' });
      }
    });
  });

  // --- Prevent hover states from bleeding outside on touch devices ---
  // A simple script to ensure tiles only hover on actual hover, not tap
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.addEventListener('touchstart', function() {
      this.classList.add('hover-active');
    }, {passive: true});
    tile.addEventListener('touchend', function() {
      setTimeout(() => this.classList.remove('hover-active'), 500);
    }, {passive: true});
  });

  // --- 3D Parallax Tilt Effect ---
  const parallaxCards = document.querySelectorAll('.tile, .tile-top-pick, .btn, .hero-image-container');
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  if (!isTouchDevice) {
    parallaxCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;
        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Calculate tilt angles (max 12 degrees for smooth look)
        const rotateX = -(mouseY / (cardHeight / 2)) * 12;
        const rotateY = (mouseX / (cardWidth / 2)) * 12;
        
        // Apply transform
        card.style.transition = 'none';
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

});

// --- Intro Screen Logic ---
function enterPortfolio(profileName) {
  const introScreen = document.getElementById('intro-screen');
  const mainApp = document.getElementById('main-app');
  
  // Optional: update the avatar in navbar based on profile chosen
  const navAvatar = document.getElementById('nav-avatar');
  
  // Update background based on profile
  const heroImageContainer = document.querySelector('.hero-image-container');
  const heroContent = document.querySelector('.hero-content');
  const heroBg = document.querySelector('.hero-bg');

  if (profileName === 'Lost Kid' || profileName === 'Stalker') {
    if (heroBg) {
      heroBg.style.backgroundImage = 'url("anime_bg.png")';
      heroBg.style.backgroundSize = 'cover';
      heroBg.style.backgroundPosition = 'center';
      heroBg.style.backgroundRepeat = 'no-repeat';
    }
    
    if (heroImageContainer) heroImageContainer.classList.add('hidden');
    if (heroContent) heroContent.classList.add('hero-full-width');
  } else {
    if (heroBg) {
      heroBg.style.backgroundImage = 'none';
    }
    
    if (heroImageContainer) heroImageContainer.classList.remove('hidden');
    if (heroContent) heroContent.classList.remove('hero-full-width');
  }

  // Fade out intro
  introScreen.style.opacity = '0';
  
  setTimeout(() => {
    introScreen.classList.add('hidden');
    mainApp.classList.remove('hidden');
    
    // Add a slight fade-in effect to the main app
    mainApp.style.opacity = '0';
    setTimeout(() => {
      mainApp.style.opacity = '1';
    }, 50);
    
    // Scroll to top
    window.scrollTo(0,0);
  }, 500); // Wait for CSS transition
}

function exitPortfolio() {
  const introScreen = document.getElementById('intro-screen');
  const mainApp = document.getElementById('main-app');
  
  // Fade out main app
  mainApp.style.opacity = '0';
  
  setTimeout(() => {
    mainApp.classList.add('hidden');
    introScreen.classList.remove('hidden');
    
    // Add a slight fade-in effect to the intro screen
    introScreen.style.opacity = '0';
    setTimeout(() => {
      introScreen.style.opacity = '1';
    }, 50);
    
    // Scroll to top
    window.scrollTo(0,0);
  }, 500); // Wait for CSS transition
}

// --- Modal Logic ---
const modalData = {
  sharebite: {
    bg: 'linear-gradient(135deg, #0b6b5b, #123b4a)',
    color: '#d8fff3',
    icon: 'fas fa-leaf',
    imgText: 'ShareBite',
    title: 'ShareBite',
    desc: 'Full-Stack Food Donation Platform',
    subdesc: `
      <div class="project-detail">
        <p><strong>Tech:</strong> React.js &bull; Node.js &bull; Express.js &bull; MongoDB &bull; JWT &bull; REST APIs</p>
        <h3>About</h3>
        <p>ShareBite is a full-stack platform designed to make food donation easier and more organized by connecting food donors with individuals and organizations in need.</p>
        <h3>How It Works</h3>
        <p class="flow">Register/Login &rarr; JWT Authentication &rarr; Dashboard &rarr; Create or Find Donations &rarr; Location-Based Discovery &rarr; Request/Claim Food &rarr; Manage Donation</p>
        <h3>Architecture</h3>
        <p>React.js &rarr; REST API &rarr; Node.js + Express.js &rarr; Authentication &amp; Business Logic &rarr; MongoDB</p>
        <p>The React frontend communicates with the Express.js backend through REST APIs. The backend handles authentication, business logic, and database operations, while MongoDB stores user and donation data.</p>
        <h3>My Contribution</h3>
        <ul><li>Developed and integrated REST APIs</li><li>Worked on JWT authentication and role-based access</li><li>Managed MongoDB database operations</li><li>Integrated frontend and backend</li><li>Tested APIs and application workflows</li><li>Debugged issues and improved reliability</li></ul>
        <h3>Advantages</h3>
        <ul><li>Makes food donation more organized</li><li>Connects donors and recipients through one platform</li><li>Secure authentication and authorization</li><li>Location-based donation discovery</li><li>Clear separation between frontend, backend, and database</li></ul>
        <h3>Limitations</h3>
        <ul><li>Depends on accurate user and location data</li><li>Food donations require quick coordination</li><li>Location functionality can be enhanced with advanced mapping features</li><li>Platform effectiveness depends on active users</li></ul>
        <h3>What I Learned</h3>
        <p>Through ShareBite, I gained practical experience with <strong>full-stack development, REST APIs, React.js, Node.js, MongoDB, JWT authentication, role-based authorization, API testing, and debugging.</strong></p>
      </div>`,
    actions: '<a href="https://sharebite-one.vercel.app" target="_blank" rel="noopener noreferrer" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fas fa-external-link-alt"></i> Live Demo</a><a href="https://github.com/AdnanKaisar" target="_blank" rel="noopener noreferrer" class="btn btn-more" style="text-decoration: none;"><i class="fab fa-github"></i> GitHub</a><button onclick="closeModal()" class="btn btn-more">Close</button>'
  },
  self_tasking_agent: {
    bg: 'linear-gradient(135deg, #422889, #152a56)',
    color: '#eee5ff',
    icon: 'fas fa-robot',
    imgText: 'Self-Tasking AI Agent',
    title: 'Self-Tasking AI Agent',
    desc: 'AI Task Automation Platform',
    subdesc: `
      <div class="project-detail">
        <p><strong>Tech:</strong> Python &bull; FastAPI &bull; React.js &bull; LangChain &bull; LLMs</p>
        <h3>About</h3>
        <p>An LLM-powered agent that understands and executes multi-step tasks through a conversational web interface.</p>
        <h3>Key Features</h3>
        <ul><li>AI task automation</li><li>Conversational memory</li><li>Multi-step execution</li><li>Real-time tracking</li><li>FastAPI APIs</li></ul>
        <h3>Product Flow</h3>
        <p class="flow">User Request &rarr; Conversational Understanding &rarr; Task Planning &rarr; Multi-Step Execution &rarr; Real-Time Progress &rarr; Result</p>
        <h3>My Contribution</h3>
        <p>Designed the conversational workflow, integrated the frontend with FastAPI services, structured multi-step task execution, and focused on observable, reliable agent behavior.</p>
      </div>`,
    actions: '<a href="https://github.com/AdnanKaisar" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fab fa-github"></i> GitHub</a><button onclick="closeModal()" class="btn btn-more">Close</button>'
  },
  portfolio_project: {
    bg: 'linear-gradient(135deg, #123b72, #122b46)',
    color: '#dceeff',
    icon: 'fas fa-layer-group',
    imgText: 'Personal Portfolio',
    title: 'Netflix-Inspired Personal Portfolio',
    desc: 'Personal Developer Portfolio',
    subdesc: `
      <div class="project-detail">
        <p><strong>Tech:</strong> React.js &bull; JavaScript &bull; HTML &bull; CSS</p>
        <p>A responsive, Netflix-inspired portfolio designed to showcase projects, technical skills, experience, and my development journey through an interactive interface.</p>
        <h3>Key Features</h3>
        <ul><li>Netflix-inspired UI/UX</li><li>Responsive design</li><li>Reusable React components</li><li>Interactive project sections</li><li>Skills and experience showcase</li><li>Modern animations and visual effects</li></ul>
        <h3>What I Learned</h3>
        <p>This project strengthened my frontend architecture, responsive design, interaction design, accessibility, and ability to present technical work clearly to hiring teams.</p>
      </div>`,
    actions: '<a href="https://github.com/AdnanKaisar" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fab fa-github"></i> GitHub</a><button onclick="closeModal()" class="btn btn-more">Close</button>'
  },
  linkedin: {
    bg: 'linear-gradient(135deg, rgba(0, 162, 255, 0.18), rgba(0, 162, 255, 0.05))',
    color: '#00a2ff',
    icon: 'fab fa-linkedin',
    imgText: 'LinkedIn',
    title: 'LinkedIn Profile',
    desc: 'Connect with me on LinkedIn for professional networking and updates.',
    subdesc: 'Regular updates on professional achievements, industry insights, and networking opportunities.',
    actions: '<a href="https://www.linkedin.com/in/adnan-kaisar-333622292" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fab fa-linkedin"></i> Connect</a>'
  },
  schedule: {
    bg: 'linear-gradient(135deg, rgba(255, 174, 25, 0.18), rgba(255, 174, 25, 0.05))',
    color: '#ffae19',
    icon: 'fas fa-calendar-alt',
    imgText: 'Schedule a Call',
    title: 'Schedule a Call',
    desc: 'Book a call with me to discuss potential collaborations, projects, or any queries you may have.',
    subdesc: 'Phone: +91 7780946112<br>Email: adnankaisar112@gmail.com',
    actions: '<a href="mailto:adnankaisar112@gmail.com" class="btn btn-play" style="background: white; color: black; margin-right: 10px; text-decoration: none;"><i class="fas fa-envelope"></i> Email</a> <a href="tel:+917780946112" class="btn btn-more" style="text-decoration: none;"><i class="fas fa-phone-alt"></i> Call</a>'
  },
  github: {
    bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.03))',
    color: '#ffffff',
    icon: 'fab fa-github',
    imgText: 'GitHub',
    title: 'GitHub',
    desc: 'Explore my open-source contributions and personal projects on GitHub.',
    subdesc: 'A collection of my web development, data analysis, and IoT projects.',
    actions: '<a href="https://github.com/AdnanKaisar" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fab fa-github"></i> View Profile</a>'
  },
  education_btech: {
    bg: 'linear-gradient(rgba(20, 20, 20, 0.55), rgba(20, 20, 20, 0.55)), url("miet_college.png") center/cover no-repeat',
    color: 'white',
    icon: 'fas fa-graduation-cap',
    imgText: 'B.Tech CSE',
    title: 'Model Institute of Engineering & Technology (Autonomous)',
    desc: 'Bachelor of Technology in Computer Science & Engineering (2023 - 2027)',
    subdesc: '<strong>Location:</strong> Kot Bhalwal, Jammu - 181122<br><strong>Status:</strong> Autonomous Institution<br><strong>Highlights:</strong> Focusing on Python programming, Data Science, and IoT Systems.',
    actions: '<a href="https://mietjmu.in/" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fas fa-external-link-alt"></i> Visit Website</a><button onclick="closeModal()" class="btn btn-more" style="margin-left: 10px;">Close</button>'
  },
  education_12th: {
    bg: 'linear-gradient(135deg, #e65c00, #F9D423)',
    color: 'white',
    icon: 'fas fa-school',
    imgText: '12th Standard',
    title: 'Govt. Higher Secondary School',
    desc: 'Higher Secondary Education (Class XII) - Completed in 2022',
    subdesc: '<strong>Stream:</strong> Non-Medical (Physics, Chemistry, Mathematics).',
    actions: '<button onclick="closeModal()" class="btn btn-play" style="background: white; color: black;">Close</button>'
  },
  education_10th: {
    bg: 'linear-gradient(135deg, #2b5876, #4e4376)',
    color: 'white',
    icon: 'fas fa-school',
    imgText: '10th Standard',
    title: 'Iqra Public Secondary School',
    desc: 'Secondary School Education (Class X) - Completed in 2020',
    subdesc: '<strong>Board:</strong> General curriculum focusing on Science, Math, and Languages.',
    actions: '<button onclick="closeModal()" class="btn btn-play" style="background: white; color: black;">Close</button>'
  },
  internship_nit: {
    bg: 'linear-gradient(rgba(20, 20, 20, 0.65), rgba(20, 20, 20, 0.65)), url("portfolio_bg.png") center/cover no-repeat',
    color: '#ffae19',
    icon: 'fas fa-microchip',
    imgText: 'IoT Internship',
    title: 'National Institute of Technology (NIT), Srinagar',
    desc: 'Internship in Internet of Things (IoT) & Sensor Networks',
    subdesc: '<strong>Focus:</strong> Embedded systems, microcontroller programming, sensor interfacing, and cloud data logging.<br><strong>Highlights:</strong> Developed IoT monitoring modules and analyzed real-time sensor streams.',
    actions: '<a href="nit_srinagar_certificate.jpg" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fas fa-certificate"></i> View Certificate</a><button onclick="closeModal()" class="btn btn-more" style="margin-left: 10px;">Close</button>'
  },
  internship_web_nit: {
    bg: 'linear-gradient(rgba(10, 38, 75, 0.72), rgba(10, 38, 75, 0.72)), url("portfolio_bg.png") center/cover no-repeat',
    color: '#dceeff',
    icon: 'fas fa-code',
    imgText: 'Web Development Internship',
    title: 'Web Development Intern — NIT Srinagar',
    desc: 'National Institute of Technology Srinagar · 15 June 2026 – 15 July 2026',
    subdesc: `
      <div class="project-detail">
        <p>Completed a <strong>Web Development Internship-cum-Project</strong> under the Department of Computer Science &amp; Engineering at NIT Srinagar. Gained hands-on experience in web development through practical project implementation, problem-solving, and technical development.</p>
        <h3>Highlights</h3>
        <ul>
          <li>Worked on a practical <strong>Web Development project</strong> from implementation to completion.</li>
          <li>Applied web development concepts in a real academic project environment.</li>
          <li>Gained hands-on experience with <strong>frontend development and web technologies.</strong></li>
          <li>Strengthened problem-solving, debugging, and project development skills.</li>
          <li>Successfully completed the internship with an <strong>Excellent</strong> performance rating.</li>
        </ul>
        <h3>Certificate</h3>
        <p>Issued by the Department of Training &amp; Placement, National Institute of Technology Srinagar.</p>
      </div>`,
    actions: '<a href="web_development_internship_certificate.jpg" target="_blank" class="btn btn-play" style="background: white; color: black; text-decoration: none;"><i class="fas fa-certificate"></i> View Certificate</a><button onclick="closeModal()" class="btn btn-more">Close</button>'
  }
};

function openModal(type) {
  const modal = document.getElementById('detail-modal');
  const data = modalData[type];
  
  if (!data) return;
  
  document.getElementById('modal-img-container').style.background = data.bg;
  document.getElementById('modal-img-container').style.color = data.color;
  document.getElementById('modal-img-container').innerHTML = `
    <i class="${data.icon}" style="font-size: 6rem;"></i>
    <h2 style="font-size: 2rem; margin-top: 15px;">${data.imgText}</h2>
  `;
  
  document.getElementById('modal-title').innerText = data.title;
  document.getElementById('modal-desc').innerText = data.desc;
  document.getElementById('modal-subdesc').innerHTML = data.subdesc;
  document.getElementById('modal-actions').innerHTML = data.actions;
  
  modal.classList.remove('hidden');
  
  // Fade in
  setTimeout(() => {
    modal.classList.add('visible');
  }, 10);
  
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeModal() {
  const modal = document.getElementById('detail-modal');
  modal.classList.remove('visible');
  
  setTimeout(() => {
    modal.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
  }, 300);
}
