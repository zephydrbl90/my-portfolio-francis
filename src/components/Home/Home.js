import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  return (
    <section>
      {/* Full viewport hero section */}
      <Container fluid className="home-section" id="home" style={{ padding: 0, minHeight: '100vh' }}>
        <Particle />
        {/* Remove the nested Container to utilize full width */}
        <div className="home-content-fullwidth">
          <Row className="align-items-center" style={{ minHeight: '100vh', margin: 0 }}>
            {/* Left content - expanded and better positioned */}
            <Col lg={7} md={6} className="home-header-expanded">
              <div className="hero-text-container">
                <h1 className="heading-expanded">
                  Hi There!{" "}
                  <span className="wave" role="img" aria-labelledby="wave">
                    👋🏻
                  </span>
                </h1>

                <h1 className="heading-name-expanded">
                  I'M
                  <strong className="main-name"> Francis Eben Haezer Rajagukguk</strong>
                </h1>

                <div className="typewriter-container">
                  <Type />
                </div>
                
                {/* Add a call-to-action section */}
                <div className="hero-cta">
                  <p className="hero-description">
                    Passionate about creating innovative web solutions and exploring the depths of technology
                  </p>
                  <div className="hero-buttons">
                    <button className="btn-primary-custom">View My Work</button>
                    <button className="btn-secondary-custom">Get In Touch</button>
                  </div>
                </div>
              </div>
            </Col>

            {/* Right content - better positioned */}
            <Col lg={5} md={6} className="hero-image-container">
              <div className="hero-image-wrapper">
                <img
                  src={homeLogo}
                  alt="home pic"
                  className="hero-main-image"
                />
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;