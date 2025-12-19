import { useState, useEffect, useRef } from 'react'
import BlurText from "./BlurText"
import GooeyNav from './components/GooeyNav'
import './App.css'
const Halaman1 = '/Halaman1.png'


function useInView(ref) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isInView;
}

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Detect active section based on scroll position
      const sections = document.querySelectorAll('section');
      let currentSectionIndex = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        // If section is visible in viewport, mark it as active
        if (rect.top < window.innerHeight * 0.3) {
          currentSectionIndex = index;
        }
      });

      // Navbar shows on all sections
      const shouldShow = true;
      setShowNavbar(shouldShow);
      setActiveSection(currentSectionIndex);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const getAnimationStyle = (sectionIndex) => {
    const scale = 1 - Math.abs(activeSection - sectionIndex) * 0.05;
    const opacity = 1 - Math.abs(activeSection - sectionIndex) * 0.2;

    return {
      transform: `scale(${Math.max(0.9, scale)})`,
      opacity: Math.max(0.6, opacity),
      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
    };
  };

  return (
    <>
      {/* Navbar dengan GooeyNav */}
      {showNavbar && (
        <nav style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'rgba(20, 20, 30, 0.4)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '50px',
          padding: '4px 18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: '1000',
          height: 'auto',
          flexWrap: 'wrap',
          boxShadow: '0 8px 32px 0 rgba(255, 107, 107, 0.3)',
          animation: 'slideDown 0.3s ease-out'
        }}>
        
        {/* Desktop GooeyNav */}
        <div style={{ display: window.innerWidth > 768 ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <GooeyNav
            items={navItems}
            particleCount={10}
            particleDistances={[55, 6]}
            particleR={65}
            initialActiveIndex={activeSection - 1}
            animationTime={600}
            timeVariance={300}
            colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          />
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: window.innerWidth <= 768 ? 'block' : 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            fontSize: '14px',
            zIndex: 1001
          }}
        >
          ☰
        </button>
        </nav>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && window.innerWidth <= 768 && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: '20px',
          right: '20px',
          backgroundColor: 'rgba(20, 20, 30, 0.9)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          padding: '20px',
          zIndex: '999',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          animation: 'slideDown 0.3s ease-out'
        }}>
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: activeSection - 1 === index ? '#FF6B6B' : '#fff',
                textDecoration: 'none',
                fontSize: '16px',
                padding: '12px 16px',
                borderRadius: '8px',
                backgroundColor: activeSection - 1 === index ? 'rgba(255, 107, 107, 0.2)' : 'transparent',
                transition: 'all 0.3s',
                textAlign: 'center'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Section Welcome dengan Cursor Tracking */}
      <WelcomeSection activeSection={activeSection} getAnimationStyle={getAnimationStyle} />
      
      {/* Rest of sections */}
      <AppSections activeSection={activeSection} getAnimationStyle={getAnimationStyle} />
    </>
  )
}

function WelcomeSection({ activeSection, getAnimationStyle }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="welcome" 
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#000',
        ...getAnimationStyle(0)
      }}
    >
      <img 
        src={Halaman1} 
        alt="background" 
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          zIndex: '1',
          transform: `translateY(${scrollY * 0.5}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />

      {/* Overlay fade effect saat scroll */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          zIndex: '2',
          pointerEvents: 'none',
          opacity: Math.min(scrollY / 500, 0.7),
          transition: 'opacity 0.1s ease-out'
        }}
      />
      
      {/* Scroll Down Animation */}
      <style>{`
        @keyframes bounce-down {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(15px);
            opacity: 0.5;
          }
        }
        
        @keyframes fade-in-out {
          0%, 100% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
        
        .scroll-down {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }
        
        .scroll-down-text {
          color: #FF6B6B;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 2px;
          animation: fade-in-out 2.5s ease-in-out infinite;
        }
        
        .scroll-down-arrow {
          color: #FF6B6B;
          font-size: 28px;
          animation: bounce-down 2.5s ease-in-out infinite;
        }
      `}</style>
      
      <div className="scroll-down" style={{ opacity: scrollY < 100 ? 1 : 0, transition: 'opacity 0.3s ease-out' }}>
        <span className="scroll-down-text">SCROLL</span>
        <div className="scroll-down-arrow">↓</div>
      </div>
    </section>
  );
}

function AppSections({ activeSection, getAnimationStyle }) {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const homeInView = useInView(homeRef);
  const aboutInView = useInView(aboutRef);
  const projectsInView = useInView(projectsRef);
  const contactInView = useInView(contactRef);

  const fadeInUp = (isInView) => ({
    opacity: isInView ? 1 : 0,
    transform: isInView ? 'translateY(0)' : 'translateY(40px)',
    transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
  });

  return (
    <>
      {/* Section 2: Home */}
      <section ref={homeRef} id="home" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px', 
        backgroundColor: '#000', 
        color: '#fff',
        ...getAnimationStyle(1)
      }}>
        <div style={{ maxWidth: '1200px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          {/* Left Content */}
          <div style={fadeInUp(homeInView)}>
            <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', color: '#888', marginBottom: '10px' }}>Hello .</p>
            <h1 style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 'bold', marginBottom: '20px' }}>I'm Nauval</h1>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: 'bold', marginBottom: '30px', color: '#888' }}>Web Developer</h2>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <button style={{ padding: '12px 30px', backgroundColor: '#FF6B6B', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Got a project?</button>
              <button style={{ padding: '12px 30px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>My resume</button>
            </div>
            <div style={{ 
              display: 'flex', 
              gap: '30px', 
              fontSize: 'clamp(14px, 3vw, 16px)', 
              color: '#666',
              overflowX: 'auto',
              paddingBottom: '10px',
              scrollBehavior: 'smooth',
              scrollSnapType: 'x mandatory'
            }}>
              {[
                { name: 'HTML', color: '#FF6B6B' },
                { name: 'CSS', color: '#4ECDC4' },
                { name: 'Javascript', color: '#F7DC6F' },
                { name: 'Laravel', color: '#E74C3C' },
                { name: 'React', color: '#3498DB' },
                { name: 'Python', color: '#2ECC71' }
              ].map((skill, idx) => (
                <div key={idx} style={{ 
                  position: 'relative', 
                  paddingBottom: '8px',
                  minWidth: 'max-content',
                  scrollSnapAlign: 'start',
                  whiteSpace: 'nowrap'
                }}>
                  <span style={{ display: 'block', color: '#fff' }}>{skill.name}</span>
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '0', 
                    left: '0', 
                    right: '0', 
                    height: '2px',
                    backgroundColor: skill.color,
                    boxShadow: `0 0 10px ${skill.color}40`
                  }}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Image placeholder */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              width: 'clamp(200px, 100%, 400px)',
              height: 'clamp(200px, 100%, 400px)',
              backgroundColor: '#FF6B6B',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '18px'
            }}>
              {/* Ganti dengan img tag nanti */}
              Image Placeholder
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: About */}
      <section ref={aboutRef} id="about" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px', 
        backgroundColor: '#000', 
        color: '#fff',
        ...getAnimationStyle(2)
      }}>
        <div style={{ maxWidth: '1200px', width: '100%', ...fadeInUp(aboutInView) }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px' }}>
            {/* Left Services */}
            <div>
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                  <span style={{ fontSize: '32px' }}>💻</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Website Development</h3>
                </div>
              </div>
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                  <span style={{ fontSize: '32px' }}>📱</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>App Development</h3>
                </div>
              </div>
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                  <span style={{ fontSize: '32px' }}>🏠</span>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Website Hosting</h3>
                </div>
              </div>
            </div>

            {/* Right About Content */}
            <div>
              <h2 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 'bold', marginBottom: '30px' }}>About me</h2>
              <p style={{ fontSize: 'clamp(14px, 3vw, 16px)', lineHeight: '1.8', color: '#aaa', marginBottom: '40px' }}>
                I started my software journey from photography. Through that, I learned to love the process of creating from scratch. Since then, this has led me to software development as it fulfills my love for learning and building things.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '30px' }}>
                <div>
                  <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF6B6B' }}>120 <span style={{ color: '#FF6B6B' }}>+</span></h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>Completed Projects</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF6B6B' }}>95 <span style={{ color: '#FF6B6B' }}>%</span></h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>Client satisfaction</p>
                </div>
                <div>
                  <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: '#FF6B6B' }}>1 <span style={{ color: '#FF6B6B' }}>+</span></h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>Years of experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Projects */}
      <section ref={projectsRef} id="projects" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px', 
        backgroundColor: '#000', 
        color: '#fff',
        ...getAnimationStyle(3)
      }}>
        <div style={{ maxWidth: '1200px', width: '100%', ...fadeInUp(projectsInView) }}>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 'bold', marginBottom: '60px', textAlign: 'center' }}>Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <div key={project} style={{
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                minHeight: '300px'
              }}>
                <div style={{
                  width: '100%',
                  height: '200px',
                  backgroundColor: '#2a2a2a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#666',
                  fontSize: '14px'
                }}>
                  Project {project} Image
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Project {project}</h3>
                  <p style={{ fontSize: '14px', color: '#888' }}>Project description goes here</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Contact */}
      <section ref={contactRef} id="contact" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px', 
        backgroundColor: '#000', 
        color: '#fff',
        ...getAnimationStyle(4)
      }}>
        <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center', ...fadeInUp(contactInView) }}>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 'bold', marginBottom: '30px' }}>Let's Work Together</h2>
          <p style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: '#aaa', marginBottom: '40px' }}>I'm always interested in hearing about new projects and opportunities.</p>
          <a href="mailto:badiulfikri24@gmail.com" style={{
            display: 'inline-block',
            padding: '15px 40px',
            backgroundColor: '#FF6B6B',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer'
          }}>
            Send me an email
          </a>
          <div style={{ marginTop: '60px', display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="https://wa.me/6281239638514" target="_blank" rel="noopener noreferrer" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
              <img src="https://cdn.simpleicons.org/whatsapp/888888" alt="Twitter" width="28" height="28" />
            </a>
            <a href="https://github.com/diulll" target="_blank" rel="noopener noreferrer" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
              <img src="https://cdn.simpleicons.org/github/888888" alt="Github" width="28" height="28" />
            </a>
            <a href="https://www.instagram.com/diul.f/" target="_blank" rel="noopener noreferrer" style={{ transition: 'opacity 0.3s' }} onMouseEnter={(e) => e.target.style.opacity = '0.7'} onMouseLeave={(e) => e.target.style.opacity = '1'}>
              <img src="https://cdn.simpleicons.org/instagram/888888" alt="Instagram" width="28" height="28" />
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

export default App