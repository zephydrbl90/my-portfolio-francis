import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiVisualstudiocode,
  SiWindows,
  SiDiscord,
  SiVirtualbox,
} from "react-icons/si";

function Toolstack() {
  const tools = [
    {
      name: "Visual Studio Code",
      icon: SiVisualstudiocode,
      color: "#007ACC",
      description: "Primary Code Editor"
    },
    {
      name: "Windows 11",
      icon: SiWindows,
      color: "#0078D4",
      description: "Operating System"
    },
    {
      name: "Discord",
      icon: SiDiscord,
      color: "#5865F2",
      description: "Communication Platform"
    },
    {
      name: "Oracle VirtualBox",
      icon: SiVirtualbox,
      color: "#183A61",
      description: "Virtualization Tool"
    }
  ];

  return (
    <div style={{ paddingBottom: "50px" }}>
      <style jsx>{`
        .tools-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          padding: 0 40px;
          position: relative;
        }
        
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
          max-width: 1000px;
          width: 100%;
        }
        
        .tool-card {
          background: linear-gradient(135deg, 
            rgba(26, 15, 11, 0.95) 0%, 
            rgba(44, 25, 18, 0.9) 25%, 
            rgba(26, 15, 11, 0.95) 50%, 
            rgba(44, 25, 18, 0.9) 75%, 
            rgba(26, 15, 11, 0.95) 100%);
          border-radius: 25px;
          padding: 35px 20px;
          text-align: center;
          border: 2px solid rgba(230, 126, 34, 0.2);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        .tool-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            transparent 0%, 
            rgba(230, 126, 34, 0.1) 25%, 
            rgba(243, 156, 18, 0.15) 50%, 
            rgba(230, 126, 34, 0.1) 75%, 
            transparent 100%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        
        .tool-card::after {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #d35400, #e67e22, #f39c12, #e67e22, #d35400);
          background-size: 400% 400%;
          border-radius: 25px;
          z-index: -1;
          opacity: 0;
          animation: gradientShift 3s ease infinite;
          transition: opacity 0.4s ease;
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .tool-card:hover {
          transform: translateY(-12px) scale(1.05);
          border-color: rgba(230, 126, 34, 0.6);
          box-shadow: 
            0 25px 50px rgba(230, 126, 34, 0.3),
            0 0 40px rgba(243, 156, 18, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .tool-card:hover::before {
          opacity: 1;
        }
        
        .tool-card:hover::after {
          opacity: 0.7;
        }
        
        .tool-icon {
          font-size: 4.5rem;
          margin-bottom: 20px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
          position: relative;
          z-index: 1;
        }
        
        .tool-card:hover .tool-icon {
          transform: scale(1.15) rotateY(15deg);
          filter: 
            drop-shadow(0 12px 24px rgba(0, 0, 0, 0.5))
            drop-shadow(0 0 20px currentColor);
        }
        
        .tool-name {
          color: #f4f1eb;
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 8px;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
          letter-spacing: 0.5px;
          position: relative;
          z-index: 1;
        }
        
        .tool-description {
          color: #d4af37;
          font-size: 0.85rem;
          font-weight: 500;
          opacity: 0.85;
          text-transform: uppercase;
          letter-spacing: 1px;
          position: relative;
          z-index: 1;
        }
        
        .floating-particles {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }
        
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: radial-gradient(circle, rgba(230, 126, 34, 0.8), transparent);
          border-radius: 50%;
          animation: float 6s infinite ease-in-out;
        }
        
        .particle:nth-child(1) { left: 10%; animation-delay: 0s; }
        .particle:nth-child(2) { left: 30%; animation-delay: 1s; }
        .particle:nth-child(3) { left: 50%; animation-delay: 2s; }
        .particle:nth-child(4) { left: 70%; animation-delay: 3s; }
        .particle:nth-child(5) { left: 90%; animation-delay: 4s; }
        
        @keyframes float {
          0%, 100% { transform: translateY(100vh) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100px) scale(1); }
        }
        
        @media (max-width: 1024px) {
          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }
          
          .tool-card {
            min-height: 180px;
            padding: 30px 15px;
          }
          
          .tool-icon {
            font-size: 4rem;
            margin-bottom: 15px;
          }
        }
        
        @media (max-width: 768px) {
          .tools-container {
            padding: 0 20px;
          }
          
          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .tool-card {
            min-height: 160px;
            padding: 25px 15px;
          }
          
          .tool-icon {
            font-size: 3.5rem;
            margin-bottom: 12px;
          }
          
          .tool-name {
            font-size: 1rem;
          }
          
          .tool-description {
            font-size: 0.75rem;
          }
        }
        
        @media (max-width: 480px) {
          .tools-grid {
            grid-template-columns: 1fr 1fr;
            gap: 15px;
          }
          
          .tool-card {
            min-height: 140px;
            padding: 20px 10px;
          }
          
          .tool-icon {
            font-size: 3rem;
            margin-bottom: 10px;
          }
          
          .tool-name {
            font-size: 0.9rem;
            margin-bottom: 6px;
          }
          
          .tool-description {
            font-size: 0.7rem;
          }
        }
      `}</style>
      
      <div className="tools-container">
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="tools-grid">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <div key={index} className="tool-card">
                <IconComponent 
                  className="tool-icon"
                  style={{ color: tool.color }}
                />
                <div className="tool-name">{tool.name}</div>
                <div className="tool-description">{tool.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Toolstack;