import React from "react";
import {
  DiJavascript1,
  DiReact,
  DiNodejs,
  DiJava,
  DiHtml5,
  DiCss3,
  DiPhp,
  DiMysql,
  DiGithubBadge,
} from "react-icons/di";
import {
  SiCanva,
  SiDocker,
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

function Techstack() {
  const skills = [
    { name: "HTML5", icon: DiHtml5, percentage: 85, color: "#e34c26" },
    { name: "CSS3", icon: DiCss3, percentage: 75, color: "#1572b6" },
    { name: "JavaScript", icon: DiJavascript1, percentage: 75, color: "#f7df1e" },
    { name: "React", icon: DiReact, percentage: 65, color: "#61dafb" },
    { name: "Node.js", icon: DiNodejs, percentage: 60, color: "#339933" },
    { name: "PHP", icon: DiPhp, percentage: 75, color: "#777bb4" },
    { name: "Java", icon: DiJava, percentage: 75, color: "#ed8b00" },
    { name: "MySQL", icon: DiMysql, percentage: 80, color: "#4479a1" },
    { name: "Canva", icon: SiCanva, percentage: 90, color: "#00c4cc" },
    { name: "VS Code", icon: VscCode, percentage: 85, color: "#007acc" },
    { name: "GitHub", icon: DiGithubBadge, percentage: 80, color: "#333" },
    { name: "Docker", icon: SiDocker, percentage: 85, color: "#2496ed" },
  ];

  const getSkillLevel = (percentage) => {
    if (percentage >= 80) return 'Expert';
    if (percentage >= 70) return 'Advanced';
    if (percentage >= 60) return 'Intermediate';
    return 'Beginner';
  };

  return (
    <div style={{ padding: "0 20px 50px", backgroundColor: "transparent" }}>
      <style jsx>{`
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 25px;
          margin-top: 20px;
        }
        
        .skill-card {
          background: rgba(30, 41, 59, 0.6);
          backdrop-filter: blur(8px);
          border-radius: 16px;
          padding: 25px 20px;
          border: 1px solid rgba(71, 85, 105, 0.3);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
          text-align: center;
        }
        
        .skill-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.7);
          border-color: rgba(255, 165, 0, 0.4);
          background: rgba(51, 65, 85, 0.7);
        }
        
        .skill-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 165, 0, 0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        .skill-card:hover::before {
          opacity: 1;
        }
        
        .skill-content {
          position: relative;
          z-index: 1;
        }
        
        .skill-icon {
          font-size: 4rem;
          margin-bottom: 16px;
          transition: all 0.3s ease;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          display: block;
        }
        
        .skill-card:hover .skill-icon {
          transform: scale(1.15) rotateY(15deg);
          filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4));
        }
        
        .skill-name {
          color: #f1f5f9;
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          letter-spacing: 0.5px;
        }
        
        .skill-percentage {
          color: #ff9500;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 16px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .progress-container {
          width: 100%;
          height: 8px;
          background: rgba(100, 116, 139, 0.2);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 12px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
          position: relative;
        }
        
        .progress-bar {
          height: 100%;
          border-radius: 12px;
          transition: width 1.5s cubic-bezier(0.23, 1, 0.320, 1);
          position: relative;
          background: linear-gradient(90deg, var(--skill-color), #a855f7);
          box-shadow: 0 2px 8px rgba(168, 85, 247, 0.3);
        }
        
        .progress-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2.5s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .skill-level {
          font-size: 0.85rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          font-weight: 500;
          margin-top: 8px;
          padding: 6px 12px;
          background: rgba(51, 65, 85, 0.4);
          border-radius: 20px;
          display: inline-block;
          border: 1px solid rgba(100, 116, 139, 0.3);
          backdrop-filter: blur(5px);
        }
        
        .skill-level.expert {
          color: #10b981;
          border-color: rgba(16, 185, 129, 0.3);
          background: rgba(16, 185, 129, 0.1);
        }
        
        .skill-level.advanced {
          color: #f59e0b;
          border-color: rgba(245, 158, 11, 0.3);
          background: rgba(245, 158, 11, 0.1);
        }
        
        .skill-level.intermediate {
          color: #3b82f6;
          border-color: rgba(59, 130, 246, 0.3);
          background: rgba(59, 130, 246, 0.1);
        }
        
        .skill-level.beginner {
          color: #8b5cf6;
          border-color: rgba(139, 92, 246, 0.3);
          background: rgba(139, 92, 246, 0.1);
        }
        
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 20px;
          }
          
          .skill-card {
            padding: 20px 15px;
          }
          
          .skill-icon {
            font-size: 3rem;
          }
          
          .skill-name {
            font-size: 1rem;
          }
          
          .skill-percentage {
            font-size: 1.4rem;
          }
        }
        
        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          
          .skill-card {
            padding: 18px 12px;
          }
          
          .skill-icon {
            font-size: 2.5rem;
          }
        }
      `}</style>
      
      <div className="skills-grid">
        {skills.map((skill, index) => {
          const IconComponent = skill.icon;
          const skillLevel = getSkillLevel(skill.percentage);
          
          return (
            <div key={index} className="skill-card">
              <div className="skill-content">
                <IconComponent 
                  className="skill-icon" 
                  style={{ color: skill.color }}
                />
                <div className="skill-name">{skill.name}</div>
                <div className="skill-percentage">{skill.percentage}%</div>
                <div className="progress-container">
                  <div 
                    className="progress-bar"
                    style={{ 
                      width: `${skill.percentage}%`,
                      '--skill-color': skill.color
                    }}
                  />
                </div>
                <div className={`skill-level ${skillLevel.toLowerCase()}`}>
                  {skillLevel}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default Techstack;