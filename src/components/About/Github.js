import React, { useState } from "react";

function LearningProgress() {
  const [selectedYear, setSelectedYear] = useState(2024);

  // Realistic college student learning data
  const learningData = {
    2023: {
      semester: "Sophomore Year",
      skills: [
        { name: "HTML/CSS", level: 65, color: "#e67e22", hours: 45 },
        { name: "JavaScript", level: 35, color: "#f39c12", hours: 60 },
        { name: "Java", level: 50, color: "#d35400", hours: 80 }
      ],
      totalHours: 185,
      projects: 3,
      gpa: "3.8",
      focus: "CS Fundamentals & Web Basics"
    },
    2024: {
      semester: "Junior Year", 
      skills: [
        { name: "HTML/CSS", level: 78, color: "#e67e22", hours: 25 },
        { name: "JavaScript", level: 58, color: "#f39c12", hours: 85 },
        { name: "Java", level: 68, color: "#d35400", hours: 95 },
        { name: "React", level: 45, color: "#e67e22", hours: 70 },
        { name: "Git", level: 55, color: "#f39c12", hours: 30 }
      ],
      totalHours: 305,
      projects: 6,
      gpa: "3.72",
      focus: "Frontend & Project Development"
    },
    2025: {
      semester: "Senior Year",
      skills: [
        { name: "HTML/CSS", level: 82, color: "#e67e22", hours: 15 },
        { name: "JavaScript", level: 72, color: "#f39c12", hours: 90 },
        { name: "Java", level: 75, color: "#d35400", hours: 110 },
        { name: "React", level: 65, color: "#e67e22", hours: 95 },
        { name: "Git", level: 70, color: "#f39c12", hours: 25 },
        { name: "Python", level: 40, color: "#d35400", hours: 55 },
        { name: "SQL", level: 50, color: "#e67e22", hours: 45 }
      ],
      totalHours: 435,
      projects: 9,
      gpa: "3.7",
      focus: "Backend & Data Management"
    }
  };

  const currentData = learningData[selectedYear];

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0f0a 25%, #2a1a10 50%, #1a0f0a 75%, #0a0a0a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <style jsx>{`
        @keyframes sparkle {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-200px); }
        }
        
        .sparkle-bg::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: 
            radial-gradient(2px 2px at 20px 30px, rgba(230, 126, 34, 0.3), transparent),
            radial-gradient(2px 2px at 40px 70px, rgba(243, 156, 18, 0.2), transparent),
            radial-gradient(1px 1px at 90px 40px, rgba(211, 84, 0, 0.3), transparent),
            radial-gradient(1px 1px at 130px 80px, rgba(230, 126, 34, 0.2), transparent),
            radial-gradient(2px 2px at 160px 30px, rgba(243, 156, 18, 0.3), transparent);
          background-repeat: repeat;
          background-size: 200px 100px;
          animation: sparkle 20s linear infinite;
          z-index: 0;
          pointer-events: none;
        }
        
        .container {
          max-width: 1200px;
          width: 100%;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          position: relative;
          z-index: 1;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .main-title {
          font-size: 3rem;
          font-weight: 700;
          background: linear-gradient(45deg, #e67e22, #f39c12);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }
        
        .subtitle {
          color: #d4af37;
          font-size: 1.2rem;
          font-weight: 400;
        }
        
        .year-selector {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 30px;
        }
        
        .year-button {
          padding: 0.8rem 2rem;
          border: 2px solid #d35400;
          background: rgba(211, 84, 0, 0.2);
          color: #f4f1eb;
          border-radius: 25px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        
        .year-button.active {
          background: linear-gradient(45deg, #d35400, #e67e22);
          box-shadow: 0 5px 15px rgba(211, 84, 0, 0.4);
          transform: translateY(-2px);
        }
        
        .year-button:hover:not(.active) {
          background: rgba(230, 126, 34, 0.3);
          transform: translateY(-2px);
        }
        
        .main-card {
          background: linear-gradient(135deg, 
            rgba(44, 24, 16, 0.9) 0%, 
            rgba(26, 14, 10, 0.95) 50%, 
            rgba(44, 24, 16, 0.9) 100%);
          border-radius: 20px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          overflow: hidden;
          border: 1px solid rgba(230, 126, 34, 0.3);
          backdrop-filter: blur(20px);
          transition: transform 0.3s ease;
        }
        
        .main-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(230, 126, 34, 0.2);
        }
        
        .card-header {
          background: linear-gradient(135deg, #d35400 0%, #e67e22 50%, #f39c12 100%);
          padding: 25px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        
        .card-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .year-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .semester {
          font-size: 1.2rem;
          opacity: 0.9;
          margin-bottom: 15px;
        }
        
        .focus-area {
          background: rgba(255, 255, 255, 0.15);
          border-radius: 20px;
          padding: 8px 16px;
          font-size: 0.9rem;
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(8px);
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          padding: 25px;
          background: rgba(26, 14, 10, 0.8);
          border-bottom: 1px solid rgba(230, 126, 34, 0.2);
          backdrop-filter: blur(8px);
        }
        
        .stat-item {
          background: rgba(26, 14, 10, 0.8);
          border-radius: 15px;
          padding: 1.5rem;
          text-align: center;
          border: 1px solid rgba(230, 126, 34, 0.2);
          transition: all 0.3s;
        }
        
        .stat-item:hover {
          border-color: #e67e22;
          background: rgba(26, 14, 10, 0.9);
          transform: translateY(-3px);
        }
        
        .stat-value {
          display: block;
          font-size: 2.5rem;
          font-weight: 700;
          color: #e67e22;
          margin-bottom: 0.5rem;
        }
        
        .stat-label {
          color: #d4af37;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
        }
        
        .skills-section {
          padding: 30px;
          background: rgba(17, 24, 39, 0.4);
        }
        
        .skills-title {
          font-size: 1.8rem;
          font-weight: 600;
          color: #f4f1eb;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .skills-grid {
          display: grid;
          gap: 16px;
        }
        
        .skill-item {
          background: rgba(26, 14, 10, 0.8);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(230, 126, 34, 0.2);
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        
        .skill-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(230, 126, 34, 0.2);
          border-color: rgba(230, 126, 34, 0.4);
        }
        
        .skill-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }
        
        .skill-name {
          font-weight: 600;
          color: #f4f1eb;
          font-size: 1.1rem;
        }
        
        .skill-info {
          display: flex;
          gap: 12px;
          font-size: 0.9rem;
          color: #d4af37;
        }
        
        .skill-percentage {
          font-weight: 600;
          color: #e67e22;
        }
        
        .skill-hours {
          opacity: 0.8;
        }
        
        .progress-bar {
          height: 8px;
          background: rgba(26, 14, 10, 0.8);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
        }
        
        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #d35400, #e67e22, #f39c12);
          border-radius: 10px;
          transition: width 0.8s ease;
          position: relative;
        }
        
        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shimmer 2s infinite;
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .timeline {
          margin-top: 30px;
          padding: 25px;
          background: linear-gradient(135deg, 
            rgba(44, 24, 16, 0.9) 0%, 
            rgba(26, 14, 10, 0.95) 50%, 
            rgba(44, 24, 16, 0.9) 100%);
          border-radius: 20px;
          border: 1px solid rgba(230, 126, 34, 0.3);
          backdrop-filter: blur(20px);
        }
        
        .timeline-title {
          text-align: center;
          font-size: 1.8rem;
          font-weight: 600;
          color: #f4f1eb;
          margin-bottom: 20px;
        }
        
        .timeline-content {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          text-align: center;
        }
        
        .timeline-item {
          padding: 15px;
          background: rgba(26, 14, 10, 0.8);
          border-radius: 15px;
          border: 1px solid rgba(230, 126, 34, 0.2);
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }
        
        .timeline-item:hover {
          border-color: #e67e22;
          box-shadow: 0 4px 16px rgba(230, 126, 34, 0.2);
          transform: translateY(-2px);
        }
        
        .timeline-item.active {
          border-color: #e67e22;
          background: linear-gradient(45deg, rgba(211, 84, 0, 0.3), rgba(230, 126, 34, 0.2));
          box-shadow: 0 0 20px rgba(230, 126, 34, 0.3);
        }
        
        .timeline-year {
          font-weight: 700;
          color: #e67e22;
          margin-bottom: 4px;
          font-size: 1.1rem;
        }
        
        .timeline-projects {
          font-size: 0.85rem;
          color: #d4af37;
        }
        
        @media (max-width: 768px) {
          .container {
            padding: 10px;
          }
          
          .main-title {
            font-size: 2rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .timeline-content {
            grid-template-columns: 1fr;
          }
          
          .year-selector {
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
          }
        }
      `}</style>
      
      <div className="sparkle-bg"></div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        <div className="container">
          <div className="header">
            <h1 className="main-title">My Learning Progress</h1>
            <p className="subtitle">Computer Science Student • Seeking Software Engineering Internship</p>
          </div>
          
          <div className="year-selector">
            {Object.keys(learningData).map(year => (
              <button
                key={year}
                className={`year-button ${selectedYear === year ? 'active' : ''}`}
                onClick={() => setSelectedYear(parseInt(year))}
              >
                {year}
              </button>
            ))}
          </div>
          
          <div className="main-card">
            <div className="card-header">
              <h2 className="year-title">{selectedYear}</h2>
              <p className="semester">{currentData.semester}</p>
              <div className="focus-area">{currentData.focus}</div>
            </div>
            
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-value">{currentData.totalHours}</span>
                <span className="stat-label">Hours Coded</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{currentData.projects}</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{currentData.gpa}</span>
                <span className="stat-label">GPA</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{currentData.skills.length}</span>
                <span className="stat-label">Technologies</span>
              </div>
            </div>
            
            <div className="skills-section">
              <h3 className="skills-title">Technical Skills</h3>
              <div className="skills-grid">
                {currentData.skills.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-info">
                        <span className="skill-percentage">{skill.level}%</span>
                        <span className="skill-hours">{skill.hours}h</span>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{
                          width: `${skill.level}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="timeline">
            <h3 className="timeline-title">Academic Journey</h3>
            <div className="timeline-content">
              {Object.entries(learningData).map(([year, data]) => (
                <div 
                  key={year}
                  className={`timeline-item ${selectedYear === year ? 'active' : ''}`}
                  onClick={() => setSelectedYear(parseInt(year))}
                >
                  <div className="timeline-year">{year}</div>
                  <div className="timeline-projects">{data.projects} Projects • {data.totalHours} Hours</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearningProgress;