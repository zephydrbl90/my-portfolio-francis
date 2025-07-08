import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import editor from "../../Assets/Projects/cyberisk.png";
import iconplus from "../../Assets/Projects/iconplus.png";
import bitsOfCode from "../../Assets/Projects/virtual.png";
import iconplus1 from "../../Assets/Projects/login-page.png";
import iconplus2 from "../../Assets/Projects/OneGame.png";
import iconplus3 from "../../Assets/Projects/OneGame.png";
import bitsOfCode1 from "../../Assets/Projects/360login.png";
import bitsOfCode2 from "../../Assets/Projects/360Use.png";
import bitsOfCode3 from "../../Assets/Projects/360source.png";
import editor1 from "../../Assets/Projects/CyberDash.png";
import editor2 from "../../Assets/Projects/RiskNavigate.png";
import editor3 from "../../Assets/Projects/RiskAssesment.png";

// Mock images for demonstration - Replace with your actual image imports
const mockImages = {
  iconplus: iconplus,
  bitsOfCode: bitsOfCode,
  editor: editor,
  loginPage: iconplus1,
  OneGame: iconplus2,
  ExGame: iconplus3,
  tourlogin: bitsOfCode1,
  touruse: bitsOfCode2,
  tourist: bitsOfCode3,
  cyberist: editor1,
  cyber: editor2,
  cuber: editor3,
};

function ProjectCard({ imgPath, title, description, onViewMore }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="project-card-view" 
      style={{ 
        backgroundColor: 'rgba(26, 26, 46, 0.8)', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        color: 'white',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        transform: isHovered ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
        borderColor: isHovered ? 'rgba(230, 126, 34, 0.4)' : 'rgba(255, 255, 255, 0.1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay at the top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #e67e22, #f39c12)',
        borderRadius: '20px 20px 0 0',
        zIndex: 1
      }} />
      
      <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px 20px 0 0' }}>
        <img 
          src={imgPath} 
          alt="card-img" 
          style={{
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        />
      </div>
      
      <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 
          style={{ 
            color: '#e67e22', 
            fontWeight: '600',
            fontSize: '1.3em',
            marginBottom: '15px',
            position: 'relative'
          }}
        >
          {title}
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: 0,
            width: '30px',
            height: '2px',
            background: '#e67e22',
            borderRadius: '1px'
          }} />
        </h3>
        
        <p 
          style={{ 
            textAlign: "justify", 
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: '1.6',
            fontSize: '0.95em',
            marginBottom: '20px',
            flex: 1
          }}
        >
          {description}
        </p>
        
        {/* View More Button */}
        <div style={{ textAlign: 'center', marginTop: 'auto' }}>
          <button
            onClick={onViewMore}
            style={{
              backgroundColor: 'rgba(230, 126, 34, 0.1)',
              border: '1px solid #e67e22',
              color: '#e67e22',
              borderRadius: '20px',
              padding: '10px 20px',
              fontSize: '0.9em',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
              width: '100%',
              maxWidth: '150px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e67e22';
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = '0 5px 15px rgba(230, 126, 34, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(230, 126, 34, 0.1)';
              e.currentTarget.style.color = '#e67e22';
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            View More
          </button>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const projectData = [
    {
      id: 1,
      imgPath: mockImages.iconplus,
      title: "Boot Camp Project",
      description: "A gamified Cybersecurity Awareness Platform designed to educate users on digital safety through interactive and engaging experiences. It combines real-world threats with gameplay to promote better security habits.",
      additionalImages: [
        mockImages.iconplus,
        mockImages.loginPage,
        mockImages.OneGame, 
        mockImages.ExGame,
      ],
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      showcaseImages: [
        {
          src: mockImages.loginPage,
          title: "Login Page for the project",
          description: "Interactive cybersecurity login panel with gamification elements"
        },
        {
          src: mockImages.OneGame,
          title: "Game explanation",
          description: "CyberGames is a web-based cybersecurity game with four interactive levels: Securing Passwords, Phishing Detector, Cyber Hygiene, and Malware Attack. Each level teaches key cybersecurity skills in a fun, accessible way"
        },
        {
          src: mockImages.ExGame,
          title: "Example Game",
          description: "One of the many games that have been provided in the platform"
        }
      ]
    },
    {
      id: 2,
      imgPath: mockImages.bitsOfCode,
      title: "Virtual Tour",
      description: "An interactive Virtual Campus Tour app designed to help new students and visitors explore the university remotely. It features 360° views of key locations, personalized admin updates, and eliminates the need for physical tours—making campus navigation simple and accessible from anywhere.",
      additionalImages: [
        mockImages.bitsOfCode,
        mockImages.tourlogin,
        mockImages.touruse,
        mockImages.tourist,
      ],
      technologies: ["HTML", "CSS", "KULAA", "Pano2VR"],
      showcaseImages: [
        {
          src: mockImages.tourlogin,
          title: "Starting page for the 360 virtual tour",
          description: "First look at our page with 360-degree panoramic views of the entire campus"
        },
        {
          src: mockImages.touruse,
          title: "Navigation Interface",
          description: "User-friendly navigation system for seamless campus exploration"
        },
        {
          src: mockImages.tourist,
          title: "Source code implementation",
          description: "Users start on the main page with a brief overview of the campus and dormitory. They can explore detailed information about facilities and accommodations, and access virtual tours of both the campus and dorms for an immersive experience. Admins can easily manage and update all content to ensure the information remains accurate and up to date."
        }
      ]
    },
    {
      id: 3,
      imgPath: mockImages.editor,
      title: "Security Risk Management",
      description: "A web-based Cyber Risk Assessment System (CRAS) built to help organizations identify, assess, and manage cybersecurity risks. The platform includes system architecture, key features, user roles, and built-in troubleshooting tools.",
      additionalImages: [
        mockImages.editor,
        mockImages.cuber,
        mockImages.cyber,
        mockImages.cyberist,
      ],
      technologies: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
      showcaseImages: [
        {
          src: mockImages.cyberist,
          title: "Risk Assessment Dashboard",
          description: "Comprehensive risk assessment and management dashboard"
        },
        {
          src: mockImages.cyber,
          title: "Risk Navigation System",
          description: "Intuitive navigation system for managing different types of security risks"
        },
        {
          src: mockImages.cuber,
          title: "Security Reports",
          description: "Detailed security analysis and compliance reporting interface"
        }
      ]
    }
  ];

  const handleViewMore = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProject(null);
  };

  // Handle click outside modal to close
  const handleModalBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h1 className="project-heading">
            My Projects <strong className="purple">During Studies</strong>
          </h1>
          <p style={{ color: "white" }}>
            Here are some projects that I worked on during my studies
          </p>
        </div>
        
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projectData.map((project) => (
            <Col md={4} className="project-card" key={project.id} style={{ marginBottom: '30px' }}>
              <ProjectCard
                imgPath={project.imgPath}
                title={project.title}
                description={project.description}
                onViewMore={() => handleViewMore(project)}
              />
            </Col>
          ))}
        </Row>
      </Container>

      {/* Enhanced Modal */}
      {showModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)',
            padding: '20px'
          }}
          onClick={handleModalBackdropClick}
        >
          <div style={{
            backgroundColor: 'rgba(26, 26, 46, 0.95)',
            border: 'none',
            borderRadius: '20px',
            overflow: 'hidden',
            maxHeight: '90vh',
            maxWidth: '90vw',
            width: '100%',
            
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)'
          }}>
            <div style={{
              padding: '20px 30px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <h2 style={{ 
                color: '#e67e22', 
                fontWeight: '600',
                fontSize: '1.5em',
                margin: 0
              }}>
                {selectedProject?.title}
              </h2>
              <button
                onClick={handleCloseModal}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e67e22',
                  fontSize: '3.0em',
                  cursor: 'pointer',
                  padding: '5px',
                  borderRadius: '50%',
                  transition: 'all 0.3s ease',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(230, 126, 34, 0.1)';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{
              padding: '30px',
              overflowY: 'auto',
              color: 'white',
              flex: 1
            }}>
              {selectedProject && (
                <>
                  {/* Project Description Section */}
                  <div style={{ marginBottom: '30px' }}>
                    <h5 style={{ color: '#e67e22', marginBottom: '15px', fontSize: '1.2em' }}>
                      Project Description
                    </h5>
                    <p style={{ 
                      color: 'rgba(255, 255, 255, 0.85)', 
                      lineHeight: '1.6',
                      textAlign: 'justify',
                      fontSize: '1em'
                    }}>
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Project Showcase Section */}
                  <div style={{ marginBottom: '30px' }}>
                    <h5 style={{ color: '#e67e22', marginBottom: '20px', fontSize: '1.2em' }}>
                      Project Showcase
                    </h5>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {selectedProject.showcaseImages?.map((showcase, index) => (
                        <div key={index} style={{
                          backgroundColor: 'rgba(0, 0, 0, 0.3)',
                          borderRadius: '15px',
                          padding: '20px',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s ease'
                        }}>
                          <div style={{
                            display: 'grid',
                            gridTemplateColumns: window.innerWidth > 768 ? '1fr 1fr' : '1fr',
                            gap: '20px',
                            alignItems: 'center'
                          }}>
                            <img
                              src={showcase.src}
                              alt={showcase.title}
                              style={{
                                width: '100%',
                                height: '200px',
                                objectFit: 'cover',
                                borderRadius: '10px',
                                border: '1px solid rgba(230, 126, 34, 0.3)',
                                transition: 'transform 0.3s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.02)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                            />
                            <div>
                              <h6 style={{ 
                                color: '#e67e22', 
                                marginBottom: '10px',
                                fontSize: '1.1em',
                                fontWeight: '600'
                              }}>
                                {showcase.title}
                              </h6>
                              <p style={{ 
                                color: 'rgba(255, 255, 255, 0.8)', 
                                lineHeight: '1.5',
                                fontSize: '0.95em',
                                margin: 0
                              }}>
                                {showcase.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Technologies Section */}
                  <div style={{ 
                    marginBottom: '30px', 
                    padding: '20px', 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', 
                    borderRadius: '15px',
                    border: '1px solid rgba(230, 126, 34, 0.2)'
                  }}>
                    <h6 style={{ color: '#e67e22', marginBottom: '15px', fontSize: '1.1em' }}>
                      Technologies Used
                    </h6>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {selectedProject.technologies?.map((tech, index) => (
                        <span key={index} style={{
                          backgroundColor: 'rgba(230, 126, 34, 0.1)',
                          color: '#e67e22',
                          padding: '8px 15px',
                          borderRadius: '20px',
                          fontSize: '0.9em',
                          border: '1px solid rgba(230, 126, 34, 0.3)',
                          fontWeight: '500'
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Additional Gallery Section */}
                  <div style={{ marginTop: '30px' }}>
                    <h5 style={{ color: '#e67e22', marginBottom: '15px', fontSize: '1.2em' }}>
                      Additional Gallery
                    </h5>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '15px'
                    }}>
                      {selectedProject.additionalImages?.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${selectedProject.title} ${index + 1}`}
                          style={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            transition: 'transform 0.3s ease',
                            cursor: 'pointer'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default Projects;