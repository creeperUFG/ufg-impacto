import React, { useState } from "react";
import ReactWordcloud from "react-wordcloud";
import { Col, Row } from "react-bootstrap";

import "./styles.css";

export default function Projects() {
  const [search, setSearch] = useState("");

  const _search = (event) => {
    event.preventDefault();

    alert(search);
  };

  const words = [{
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 70,
  }]

  return (
    <div className="projects-content">
      <Row>
        <Col md={4}>
          <p>
            Saiba mais sobre os <strong>projetos</strong>
          </p>
          <p>
            realizados pela <strong>UFG</strong>
          </p>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <form onSubmit={_search}>
            <input
              type="text"
              id="search"
              placeholder="pesquise por um projeto..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </form>
        </Col>
      </Row>

      <div className="titulo">
        <h3>Ensino</h3>
      </div>
      <ReactWordcloud words={words} />
    </div>
  );
}
