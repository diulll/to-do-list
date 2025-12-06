import { useState, useEffect, useRef } from 'react'
import BlurText from "./BlurText"
import GooeyNav from './components/GooeyNav'
import './App.css'

function App() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar ketika scroll lebih dari 100px
      if (window.scrollY > 100) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }

      // Detect active section based on scroll position
      const sections = document.querySelectorAll('section, [id="welcome"]');
      let currentSectionIndex = 0;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
          currentSectionIndex = index;
        }
      });

      setActiveSection(currentSectionIndex);
    };

    window.addEventListener('scroll', handleScroll);
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
    const blur = Math.abs(activeSection - sectionIndex) * 2;

    return {
      transform: `scale(${Math.max(0.9, scale)})`,
      opacity: Math.max(0.6, opacity),
      filter: `blur(${blur}px)`,
      transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)'
    };
  };

  return (
    <>
      {/* Navbar dengan GooeyNav */}
      <nav style={{
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        padding: window.innerWidth <= 768 ? '15px 20px' : '15px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: '1000',
        opacity: showNavbar ? 1 : 0,
        transform: showNavbar ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'all 0.3s ease-in-out',
        backdropFilter: 'blur(10px)',
        height: '70px',
        flexWrap: 'wrap'
      }}>
        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', cursor: 'pointer' }} onClick={handleLogoClick}>Nauval</h1>
        
        {/* Desktop GooeyNav */}
        <div style={{ display: window.innerWidth > 768 ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center' }}>
          <GooeyNav
            items={navItems}
            particleCount={15}
            particleDistances={[90, 10]}
            particleR={100}
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
            fontSize: '24px',
            zIndex: 1001
          }}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && window.innerWidth <= 768 && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: '0',
          right: '0',
          backgroundColor: 'rgba(0, 0, 0, 0.98)',
          backdropFilter: 'blur(10px)',
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
                padding: '12px 0',
                borderBottom: '1px solid #333',
                transition: 'color 0.3s'
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [gridCells, setGridCells] = useState([]);
  const welcomeRef = useRef(null);

  useEffect(() => {
    // Create grid cells
    const cells = [];
    const cellSize = 40;
    const cols = Math.ceil(window.innerWidth / cellSize);
    const rows = Math.ceil(window.innerHeight / cellSize);
    
    let id = 0;
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        cells.push({
          id: id++,
          x: x * cellSize,
          y: y * cellSize,
          size: cellSize
        });
      }
    }
    setGridCells(cells);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (welcomeRef.current) {
        const rect = welcomeRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
      }
    };

    const welcomeSection = document.getElementById('welcome');
    if (welcomeSection) {
      welcomeSection.addEventListener('mousemove', handleMouseMove);
      return () => welcomeSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <>
      {/* Section Welcome */}
      <div id="welcome" ref={welcomeRef} style={{ 
        minHeight: '100vh', 
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        padding: '20px', 
        position: 'relative', 
        overflow: 'hidden', 
        backgroundColor: '#000',
        ...getAnimationStyle(0)
      }}>
        {/* Grid Cells Background */}
        {gridCells.map(cell => {
          const distance = Math.sqrt(
            Math.pow(mousePos.x - (cell.x + cell.size / 2), 2) + 
            Math.pow(mousePos.y - (cell.y + cell.size / 2), 2)
          );
          const maxDistance = 200;
          const opacity = Math.max(0, 1 - distance / maxDistance) * 0.8;
          
          return (
            <div
              key={cell.id}
              style={{
                position: 'absolute',
                left: `${cell.x}px`,
                top: `${cell.y}px`,
                width: `${cell.size}px`,
                height: `${cell.size}px`,
                border: `1px solid rgba(255, 107, 107, ${opacity * 0.6})`,
                backgroundColor: `rgba(255, 107, 107, ${opacity * 0.1})`,
                pointerEvents: 'none',
                transition: 'all 0.1s ease-out',
                boxShadow: opacity > 0.3 ? `0 0 ${opacity * 20}px rgba(255, 107, 107, ${opacity * 0.8})` : 'none'
              }}
            />
          );
        })}

        {/* Cursor Glow Circle */}
        <div style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          background: `radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%)`,
          borderRadius: '50%',
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          filter: 'blur(20px)',
          transition: 'all 0.1s ease-out'
        }} />

        {/* Content - Left aligned */}
        <div style={{ 
          position: 'relative', 
          zIndex: '2', 
          maxWidth: '600px',
          paddingLeft: window.innerWidth <= 768 ? '0' : '60px'
        }}>
          <BlurText
            text="Nauval Badiul Fikri Alhadad Hs"
            delay={300}
            animateBy="words"
            direction="top"
            className="mb-8"
            style={{ 
              fontSize: 'clamp(32px, 8vw, 80px)',
              fontWeight: 'bold',
              textAlign: window.innerWidth <= 768 ? 'center' : 'left',
              width: '100%',
              overflow: 'hidden',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              color: '#fff'
            }}
          />
          <BlurText
            text="Portofolio"
            delay={300}
            animateBy="words"
            direction="top"
            className="mb-8"
            style={{ 
              fontSize: 'clamp(32px, 8vw, 80px)',
              fontWeight: 'bold',
              textAlign: window.innerWidth <= 768 ? 'center' : 'left',
              width: '100%',
              overflow: 'hidden',
              wordBreak: 'break-word',
              whiteSpace: 'normal',
              color: '#fff'
            }}
          />
        </div>
      </div>
    </>
  )
}

function AppSections({ activeSection, getAnimationStyle }) {
  return (
    <>
      {/* Section 2: Home */}
      <section id="home" style={{ 
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
          <div>
            <p style={{ fontSize: 'clamp(16px, 4vw, 20px)', color: '#888', marginBottom: '10px' }}>Hello .</p>
            <h1 style={{ fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 'bold', marginBottom: '20px' }}>I'm Nauval</h1>
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 40px)', fontWeight: 'bold', marginBottom: '30px', color: '#888' }}>Web Developer</h2>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }}>
              <button style={{ padding: '12px 30px', backgroundColor: '#FF6B6B', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>Got a project?</button>
              <button style={{ padding: '12px 30px', backgroundColor: 'transparent', color: 'white', border: '1px solid white', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>My resume</button>
            </div>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', fontSize: 'clamp(14px, 3vw, 16px)', color: '#666' }}>
              <div style={{ position: 'relative', paddingBottom: '8px' }}>
                <span style={{ display: 'block' }}>HTML</span>
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '2px',  }}></div>
              </div>
              <div style={{ position: 'relative', paddingBottom: '8px' }}>
                <span style={{ display: 'block' }}>CSS</span>
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '2px',  }}></div>
              </div>
              <div style={{ position: 'relative', paddingBottom: '8px' }}>
                <span style={{ display: 'block' }}>Javascript</span>
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '2px',  }}></div>
              </div>
              <div style={{ position: 'relative', paddingBottom: '8px' }}>
                <span style={{ display: 'block' }}>Laravel</span>
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '2px',  }}></div>
              </div>
              <div style={{ position: 'relative', paddingBottom: '8px' }}>
                <span style={{ display: 'block' }}>React</span>
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '2px',  }}></div>
              </div>
              <div style={{ position: 'relative', paddingBottom: '8px' }}>
                <span style={{ display: 'block' }}>Python</span>
                <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', height: '2px', }}></div>
              </div>
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
      <section id="about" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px', 
        backgroundColor: '#000', 
        color: '#fff',
        ...getAnimationStyle(2)
      }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
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
      <section id="projects" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px', 
        backgroundColor: '#000', 
        color: '#fff',
        ...getAnimationStyle(3)
      }}>
        <div style={{ maxWidth: '1200px', width: '100%' }}>
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
      <section id="contact" style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '40px 20px', 
        backgroundColor: '#000', 
        color: '#fff',
        ...getAnimationStyle(4)
      }}>
        <div style={{ maxWidth: '800px', width: '100%', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 'bold', marginBottom: '30px' }}>Let's Work Together</h2>
          <p style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: '#aaa', marginBottom: '40px' }}>I'm always interested in hearing about new projects and opportunities.</p>
          <a href="mailto:contact@example.com" style={{
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