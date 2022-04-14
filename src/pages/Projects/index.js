import React, { useEffect, useState } from "react";
import ReactWordcloud from "react-wordcloud";
import { Col, Row } from "react-bootstrap";

import "./styles.css";

import api, { projectsURL } from "../../services/api";

export default function Projects({ history }) {
  const [search, setSearch] = useState("");
  const [teachingWords, setTeachingWords] = useState([]);
  const [researchWords, setResearchWords] = useState([]);
  const [extensionWords, setExtensionWords] = useState([]);

  const _search = (event) => {
    event.preventDefault();

    alert(search);
  };

  const options = {
    colors: ["#06A7E2", "#4CBEE8", "#07A8E3", "#215263", "#0582B0"],
    font: "Inter",
    fontSizes: [20, 84],
    padding: 1,
    rotations: 3,
    rotationsAngles: [0, 90],
    scale: "sqrt",
    spiral: "archimedean",
    transitionDuration: 1000,
  };

  const callbacks = {
    onWordClick: (word) => {
      history.push({
        pathname: "/projects/search",
        state: {
          keywords: word.text,
          projectType: "teaching",
        },
      });
    },
  };

  /* ENSINO */
  useEffect(() => {
    const getTeachingWords = async () => {
      try {
        const response = await api(projectsURL).get(
          `/projects/teaching/wordcloud`
        );

        setTeachingWords(response.data.words);
      } catch (err) {
        console.log(err);
        setTeachingWords([]);
      }
    };

    getTeachingWords();
  }, []);

  /* PESQUISA */
  useEffect(() => {
    const getResearchWords = async () => {
      try {
        const response = await api(projectsURL).get(
          `/projects/research/wordcloud`
        );

        setResearchWords(response.data.words);
      } catch (err) {
        console.log(err);
        setResearchWords([]);
      }
    };

    getResearchWords();
  }, []);

  /* EXTENSÃO */
  useEffect(() => {
    const getExtensionWords = async () => {
      try {
        const response = await api(projectsURL).get(
          `/projects/teaching/wordcloud`
        );

        setExtensionWords(response.data.words);
      } catch (err) {
        console.log(err);
        setExtensionWords([]);
      }
    };

    getExtensionWords();
  }, []);

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

      <div className="wordcloud-container">
        <div className="titulo">
          <h3>Ensino</h3>
        </div>
        <ReactWordcloud
          words={teachingWords}
          options={options}
          callbacks={callbacks}
        />
      </div>
      
      <div className="wordcloud-container">
        <div className="titulo">
          <h3>Pesquisa</h3>
        </div>
        <ReactWordcloud
          words={researchWords}
          options={options}
          callbacks={callbacks}
        />
      </div>

      <div className="wordcloud-container">
        <div className="titulo">
          <h3>Extensão</h3>
        </div>
        <ReactWordcloud
          words={extensionWords}
          options={options}
          callbacks={callbacks}
        />
      </div>
    </div>
  );
}
