import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ProjectCards(props) {
  return (
    <Card 
      className="project-card-view" 
      style={{ 
        backgroundColor: 'rgba(26, 26, 46, 0.8)', 
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '20px', // Elegant rounded corners
        color: 'white',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(230, 126, 34, 0.2)';
        e.currentTarget.style.borderColor = 'rgba(230, 126, 34, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
      }}
    >
      {/* Gradient overlay at the top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #e67e22, #f39c12)',
        borderRadius: '20px 20px 0 0'
      }} />
      
      <Card.Img 
        variant="top" 
        src={props.imgPath} 
        alt="card-img" 
        style={{
          borderRadius: '20px 20px 0 0',
          height: '200px',
          objectFit: 'cover',
          transition: 'transform 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      />
      
      <Card.Body style={{ padding: '25px' }}>
        <Card.Title 
          style={{ 
            color: '#e67e22', 
            fontWeight: '600',
            fontSize: '1.3em',
            marginBottom: '15px',
            position: 'relative'
          }}
        >
          {props.title}
          {/* Underline effect */}
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: 0,
            width: '30px',
            height: '2px',
            background: '#e67e22',
            borderRadius: '1px'
          }} />
        </Card.Title>
        
        <Card.Text 
          style={{ 
            textAlign: "justify", 
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: '1.6',
            fontSize: '0.95em',
            marginBottom: '20px'
          }}
        >
          {props.description}
        </Card.Text>
        
        {/* View More Button */}
        {props.onViewMore && (
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <Button
              variant="outline-warning"
              size="sm"
              onClick={props.onViewMore}
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
                maxWidth: '150px'
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
            </Button>
          </div>
        )}
        
        {/* Optional: Add a subtle bottom border */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '25px',
          right: '25px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(230, 126, 34, 0.3), transparent)'
        }} />
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;