import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
        Hi Everyone, I am <span className="purple">Francis Eben Haezer Rajagukguk </span>  
          from <span className="purple"> Bekasi, Jawa Barat – Indonesia</span>.
          <br />
            I am currently a student at President University majoring in Informatics.
          <br />
          <br />
        I am passionate about exploring the world of technology and always eager to learn more — especially in real-world environments where I can grow through hands-on experience. I'm actively looking for opportunities to contribute, collaborate, and develop my skills further as a <span className="purple">future intern</span>.
          <br />
            <br />
          Apart from coding, some other activities that I love to do :
            </p>

          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Games
            </li>
            <li className="about-activity">
              <ImPointRight /> learning problem solving skills case
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p className="purple">
            "If I can't win with who I am now, then I'll break my limits and become someone who can—right here, right now."  {" "}
          </p>
          <footer className="blockquote-footer">Francis Eben Haezer Rajagukguk</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;