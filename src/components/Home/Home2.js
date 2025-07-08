import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/francis.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

// Extracted data for cards
const passionData = [
  {
    id: 'problem-solving',
    icon: '🎯',
    title: 'Problem Solving',
    description: 'I thrive on breaking down complex challenges into elegant, simple solutions that make a real difference.'
  },
  {
    id: 'continuous-learning',
    icon: '🌱',
    title: 'Continuous Learning',
    description: 'Technology evolves rapidly, and I\'m passionate about staying ahead of the curve through constant exploration and growth.'
  },
  {
    id: 'meaningful-impact',
    icon: '🤝',
    title: 'Meaningful Impact',
    description: 'Finding interesting people who have the same drive and passion as me and making meaningful bond'
  }
];

const personalityData = [
  {
    id: 'sports-enthusiast',
    icon: '⚽',
    title: 'Sports Enthusiast',
    description: 'I believe in the power of sports to build discipline, teamwork, and resilience. Whether it\'s on the field or in life, I bring the same competitive spirit and determination to everything I do.'
  },
  {
    id: 'growth-mindset',
    icon: '📈',
    title: 'Growth Mindset',
    description: 'Every challenge is an opportunity to grow. I embrace setbacks as learning experiences and constantly seek ways to improve both personally and professionally.'
  }
];

const socialLinks = [
  {
    id: 'github',
    href: 'https://github.com/zephydrbl90',
    icon: AiFillGithub,
    label: 'GitHub'
  },
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/in/fracismo-eben-haezer-8a6a0428a/',
    icon: FaLinkedinIn,
    label: 'LinkedIn'
  },
  {
    id: 'twitter',
    href: 'https://x.com/FMozario20082',
    icon: AiOutlineTwitter,
    label: 'Twitter'
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/francishaezeer/',
    icon: AiFillInstagram,
    label: 'Instagram'
  }
];

// Enhanced Card Component with better performance and no white lines
const AnimatedCard = ({ children, className = "" }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const cardRef = React.useRef(null);

  const baseStyles = {
    background: isHovered 
      ? 'rgba(26, 26, 46, 0.9)' 
      : 'rgba(26, 26, 46, 0.7)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)', // Safari support
    border: isHovered 
      ? '1px solid rgba(230, 126, 34, 0.7)' 
      : '1px solid rgba(230, 126, 34, 0.3)',
    borderRadius: '15px',
    padding: '1.2rem',
    textAlign: 'center',
    transition: 'all 0.35s ease-out',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    isolation: 'isolate', // Creates new stacking context
    transform: isHovered ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
    boxShadow: isHovered 
      ? '0 15px 40px rgba(230, 126, 34, 0.25), 0 5px 15px rgba(0, 0, 0, 0.1)' 
      : '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: isHovered ? 10 : 1,
  };

  // Smooth hover handlers with debouncing
  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`animated-card ${className}`}
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Subtle background gradient overlay */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(230, 126, 34, 0.05), rgba(230, 126, 34, 0.02))' 
            : 'transparent',
          borderRadius: '15px',
          transition: 'background 0.35s ease-out',
          zIndex: -1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
};

// Enhanced Social Link Component
const SocialLink = ({ href, icon: Icon, label }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const linkRef = React.useRef(null);

  const baseStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '145px',
    height: '55px',
    borderRadius: '18px',
    background: isHovered 
      ? 'linear-gradient(135deg, rgba(230, 126, 34, 0.9), rgba(230, 126, 34, 0.7))'
      : 'linear-gradient(135deg, rgba(230, 126, 34, 0.15), rgba(230, 126, 34, 0.05))',
    color: isHovered ? '#ffffff' : 'rgba(230, 126, 34, 0.9)',
    textDecoration: 'none',
    fontSize: '1.1em',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: isHovered 
      ? '1px solid rgba(230, 126, 34, 0.8)' 
      : '1px solid rgba(230, 126, 34, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    position: 'relative',
    overflow: 'hidden',
    isolation: 'isolate',
    transform: isHovered ? 'translateY(-5px) scale(1.05)' : 'translateY(0) scale(1)',
    boxShadow: isHovered 
      ? '0 10px 30px rgba(230, 126, 34, 0.3)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    zIndex: isHovered ? 10 : 1,
  };

  const handleMouseEnter = React.useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={label}
    >
      {/* Background overlay for smoother transitions */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isHovered 
            ? 'rgba(230, 126, 34, 0.1)' 
            : 'transparent',
          borderRadius: '18px',
          transition: 'background 0.3s ease-out',
          zIndex: -1,
        }}
      />
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        position: 'relative',
        zIndex: 1
      }}>
        <Icon style={{ fontSize: '1.2em' }} />
        <span style={{ 
          fontSize: '0.85em', 
          fontWeight: '600', 
          letterSpacing: '0.5px'
        }}>
          {label}
        </span>
      </div>
    </a>
  );
};

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container style={{ maxWidth: '1400px' }}>
        {/* Header Section */}
        <Row style={{ marginBottom: '3rem' }}>
          <Col lg={12}>
            <h1 style={{ 
              fontSize: "clamp(2rem, 4vw, 3rem)", 
              textAlign: 'center', 
              marginBottom: '3rem', 
              color: 'white' 
            }}>
              ALLOW ME TO <span className="purple"> SHARE A BIT </span> ABOUT WHO I AM
            </h1>
          </Col>
        </Row>

        {/* Main Content Section with Text and Image Side by Side */}
        <Row className="align-items-center" style={{ marginBottom: '3rem' }}>
          <Col lg={8} md={7} className="home-about-description">
            <div className="about-content-wrapper">
              <p className="home-about-body" style={{ color: 'white' }}>
                My journey into tech began with curiosity, but it quickly turned into a calling. 🚀
                <br /><br />
                I have developed solid experience in
                <i>
                  <b className="purple"> HTML, CSS, and MySQL, </b>
                </i>
                and I'm constantly leveling up my skills in full-stack development.
                <br /><br />
                My main areas of interest include developing intuitive &nbsp;
                <i>
                  <b className="purple">Web Applications</b> and diving deep into fields like&nbsp;
                  <b className="purple">Cybersecurity</b> and <b className="purple">Java Programming</b>.
                </i>
                <br /><br />
                I enjoy building meaningful digital experiences using <b className="purple">HTML</b> and
                <i>
                  <b className="purple"> styling them with CSS</b>
                </i>
                &nbsp; while making them interactive through <b className="purple">JavaScript</b>.
                <br /><br />
                When I'm not coding, I'm probably learning how to become more <b className="purple">disciplined, purposeful,</b> and ready to take on real-world challenges.
              </p>
            </div>
          </Col>
          
          <Col lg={4} md={5} className="myAvtar-enhanced">
            <div className="avatar-container" style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center'
            }}>
              <Tilt
                perspective={1000}
                glareEnable={true}
                glareMaxOpacity={0.45}
                scale={1.02}
              >
                <div className="avatar-wrapper" style={{ 
                  width: '280px', 
                  height: '280px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '3px solid rgba(230, 126, 34, 0.5)',
                  boxShadow: '0 10px 30px rgba(230, 126, 34, 0.3)'
                }}>
                  <img 
                    src={myImg} 
                    className="avatar-image" 
                    alt="Francis Eben Haezer Rajagukguk"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </div>
              </Tilt>
            </div>
          </Col>
        </Row>

        {/* Cards Section Below Text and Image */}
        <Row>
          <Col lg={12}>
            <div className="cards-content-wrapper">
              
              {/* Passion Section */}
              <div className="passion-highlight" style={{ marginTop: '2rem' }}>
                <h3 style={{ 
                  color: 'var(--primary-accent)', 
                  marginBottom: '1rem', 
                  textAlign: 'center', 
                  fontSize: 'clamp(2.0rem, 2.5vw, 2.0rem)' 
                }}>
                  💡 What Drives Me
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                  gap: '1.5rem',
                  marginBottom: '2rem'
                }}>
                  {passionData.map((item) => (
                    <AnimatedCard key={item.id}>
                      <div style={{ fontSize: '3.0rem', marginBottom: '0.8rem' }}>
                        {item.icon}
                      </div>
                      <h4 style={{ 
                        color: 'var(--primary-accent)', 
                        marginBottom: '0.8rem', 
                        fontSize: '1.1rem' 
                      }}>
                        {item.title}
                      </h4>
                      <p style={{ 
                        color: 'var(--text-light)', 
                        fontSize: '0.9rem', 
                        lineHeight: '1.4' 
                      }}>
                        {item.description}
                      </p>
                    </AnimatedCard>
                  ))}
                </div>
              </div>

              {/* Personality Section */}
              <div className="personality-highlight" style={{ marginTop: '1.5rem' }}>
                <h3 style={{ 
                  color: 'var(--primary-accent)', 
                  marginBottom: '1rem', 
                  textAlign: 'center', 
                  fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' 
                }}>
                  🌟 Beyond The Code
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                  gap: '1.5rem'
                }}>
                  {personalityData.map((item) => (
                    <AnimatedCard key={item.id}>
                      <div style={{ fontSize: '3.0rem', marginBottom: '0.8rem' }}>
                        {item.icon}
                      </div>
                      <h4 style={{ 
                        color: 'var(--primary-accent)', 
                        marginBottom: '0.8rem', 
                        fontSize: '1.2rem' 
                      }}>
                        {item.title}
                      </h4>
                      <p style={{ 
                        color: 'var(--text-light)', 
                        fontSize: '0.95rem', 
                        lineHeight: '1.5' 
                      }}>
                        {item.description}
                      </p>
                    </AnimatedCard>
                  ))}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        {/* Social Section */}
        <Row className="social-section">
          <Col md={12} className="home-about-social-enhanced">
            <h2 style={{ 
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', 
              marginBottom: '1rem', 
              color: 'white' 
            }}>
              FIND ME ON
            </h2>
            <p style={{ 
              fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)', 
              marginBottom: '2rem', 
              color: 'white' 
            }}>
              Feel free to <span className="purple">connect </span>with me
            </p>
            
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '15px',
              flexWrap: 'wrap'
            }}>
              {socialLinks.map((link) => (
                <SocialLink
                  key={link.id}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                />
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;