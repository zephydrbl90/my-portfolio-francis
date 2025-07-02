import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/cyberisk.png";
import iconplus from "../../Assets/Projects/iconplus.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/virtual.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Projects <strong className="purple">During Studies </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are some project that i work on
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={iconplus}
              title="Boot Camp Project"
              description="A gamified Cybersecurity Awareness Platform designed to educate users on digital safety through interactive and engaging experiences. It combines real-world threats with gameplay to promote better security habits."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              title="Virtual Tour"
              description="An interactive Virtual Campus Tour app designed to help new students and visitors explore the university remotely. It features 360° views of key locations, personalized admin updates, and eliminates the need for physical tours—making campus navigation simple and accessible from anywhere.

"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              title="Security Risk Management"
              description="A web-based Cyber Risk Assessment System (CRAS) built to help organizations identify, assess, and manage cybersecurity risks. The platform includes system architecture, key features, user roles, and built-in troubleshooting tools."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              title="Plant AI"
              description="Used the plant disease dataset from Kaggle and trained a image classifer model using 'PyTorch' framework using CNN and Transfer Learning with 38 classes of various plant leaves. The model was successfully able to detect diseased and healthy leaves of 14 unique plants. I was able to achieve an accuracy of 98% by using Resnet34 pretrained model."
            />
          </Col>

         
         
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;