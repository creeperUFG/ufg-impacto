import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";
import { useLocation } from "react-router-dom";

import {
  remove_accentuation,
  remove_stopwords,
} from "../../services/functions";

import { Col, Row } from "react-bootstrap";

import {IoSearchOutline} from 'react-icons/io5';

import "./styles.css";
import api, { projectsURL } from "../../services/api";

export default function SearchProjects({}) {
  const { state } = useLocation();

  const [searchText, setSearchText] = useState(state ? state.keywords : "");
  const [loading, setLoading] = useState(false);

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    _search(state ? state.keywords : "", state ? state.projectType : "");
  }, []);

  const _search = async (text, projectType = "") => {
    if (text) {
      setLoading(true);
      text = text.toLowerCase(); // colaca a string em minusculo
      text = text.replace(/\./g, ""); // remove todos os pontos da string

      text = remove_stopwords(text); // remove todas as stopwords
      text = remove_accentuation(text); // remove todos os acentos

      const keywords = text.split(" "); // criação do array de keywords

      try {
        const response = await api(projectsURL).post(
          `/projects/${projectType}`,
          {
            keywords,
          }
        );

        setProjects(response.data.projects);
        console.log(response.data.projects);
      } catch (err) {
        console.log(err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    }
  };

  const _newSearch = (event) => {
    event.preventDefault();
    _search(searchText);
  };

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
          <form onSubmit={_newSearch}>
            <input
              type="text"
              id="search"
              placeholder="pesquise por um projeto..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />    
            <button onClick={_newSearch} type="button">
              <IoSearchOutline size={18} color="#06A7E2" />
            </button>
          </form>
        </Col>
      </Row>
      <Row className="projects">
        <Col md={1}>
          <p>
            <strong>ID</strong>
          </p>
        </Col>
        <Col>
          <p>
            <strong>Título do projeto</strong>
          </p>
        </Col>
        <Col>
          <p>
            <strong>Coordenação</strong>
          </p>
        </Col>
        <Col>
          <p>
            <strong>Unidade acadêmica</strong>
          </p>
        </Col>
        <Col>
          <p>
            <strong>Tipo do projeto</strong>
          </p>
        </Col>
      </Row>

      {loading && (
        <div className="loading">
          <ReactLoading type="bubbles" color="#49a7e2" height={100} />
        </div>
      )}

      {!loading &&
        projects.map((project, index) => (
          <Row key={index}>
            <Col md={1}>
              <p>{project.idProjeto}</p>
            </Col>
            <Col>
              <p>{project.titulo_projeto}</p>
            </Col>
            <Col>
              <p>{project.coordenacao_projeto}</p>
            </Col>
            <Col>
              <p>{project.nome_unidade_projeto}</p>
            </Col>
            <Col>
              <p>{project.tipo_projeto}</p>
            </Col>
          </Row>
        ))}
    </div>
  );
}
