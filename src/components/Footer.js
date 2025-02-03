import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="bg-dark text-center text-light text-lg-left" >
      <Container className="p-4">
        <Row>
          <Col lg={6} md={12} className="mb-4">
            <h5 className="text-uppercase"></h5>
            <p>
            Ensuring student safety with seamless travel tracking and instant arrival confirmations.
            </p>
          </Col>

          <Col lg={6} md={12} className="mb-4">
            <h5 className="text-uppercase"></h5>
            <p>
            Stay connected and informed—because your journey matters to us and your loved ones.
            </p>
          </Col>
        </Row>
      </Container>

      <div className="text-center p-3 bg-dark text-white">
        &copy; {new Date().getFullYear()} Copyright:{" "}
        <a className="text-white" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;
