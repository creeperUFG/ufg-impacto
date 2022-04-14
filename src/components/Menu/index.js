import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

import logo from "./../../assets/logo.svg";
import imgMenu from "./../../assets/imgMenu.svg";

import "./styles.css";

export default function Menu() {
  return (
    <>
      <Navbar expand="lg">
        <div className="img-menu">
          <img width={260} src={imgMenu} alt="UFG Impacto" />
        </div>
        <Container>
          <Navbar.Brand href="/">
            <img className="icon" width={150} src={logo} alt="UFG Impacto" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/projects">Projetos</Nav.Link>
              <Nav.Link href="/indicators/course">
                Indicadores do curso
              </Nav.Link>
              <Nav.Link href="/indicators/class">Indicadores da turma</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
