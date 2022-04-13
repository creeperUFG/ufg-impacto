import React, { useEffect, useState } from "react";

import { Autocomplete, TextField } from "@mui/material";
import ReactLoading from "react-loading";
import { Col, Row } from "react-bootstrap";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

import api, { studentsURL } from "../../services/api";

import "./styles.css";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CourseIndicators() {
  const [courses, setCourses] = useState([]);
  const [course, setCourse] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");
  const [loadingCourses, setLoadingCourses] = useState(false);

  const [loadingIndicators, setLoadingIndicators] = useState(false);
  const [studentsData, setStudentsData] = useState(undefined);

  const [loadingQuotaIndicators, setLoadingQuotaIndicators] = useState(false);
  const [quotaStudentsData, setQuotaStudentsData] = useState(undefined);

  useEffect(() => {
    const getCourses = async () => {
      setLoadingCourses(true);

      try {
        const response = await api(studentsURL).get(`/courses`);

        setCourses(response.data.courses);
      } catch (err) {
        console.log(err);
        setCourses([]);
      } finally {
        setLoadingCourses(false);
      }
    };

    getCourses();
  }, []);

  const _search = async () => {
    if (course && startYear && endYear) {
      setLoadingIndicators(true);
      try {
        const indicators = await api(studentsURL).get(
          `/class/indicators/course/${course}/startyear/${startYear}/endyear/${endYear}`
        );

        setStudentsData({
          labels: ["Formados", "Desistentes", "Ativos"],
          datasets: [
            {
              label: "# of Votes",
              data: [
                indicators.data.graduatedStudents,
                indicators.data.dropoutStudents,
                indicators.data.activeStudents,
              ],
              backgroundColor: ["#228B22", "#DC143C", "#DAA520"],
              startYear: indicators.data.startYear,
              endYear: indicators.data.endYear,
              graduatedStudents: indicators.data.graduatedStudents,
              dropoutStudents: indicators.data.dropoutStudents,
              activeStudents: indicators.data.activeStudents,
            },
          ],
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingIndicators(false);
      }
    } else {
      alert(
        "Informe o nome do curso, o ano de início da turma e o ano de término da turma."
      );
    }
  };

  return (
    <div className="indicators-content">
      <Row>
        <Col md={4}>
          <p>
            Saiba mais sobre os <strong>indicadores</strong>
          </p>
          <p>
            dos cursos da <strong>UFG</strong>
          </p>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <form onSubmit={_search}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={courses}
              onChange={(event, value) => setCourse(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  id="standard-basic"
                  variant="standard"
                  label="Curso"
                  placeholder="Selecione um curso"
                  style={{ color: "#49a7e2", width: "100%", marginBottom: 10 }}
                />
              )}
            />

            <div className="years">
              <div className="year">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Ano de início"
                  placeholder="opcional"
                  value={startYear}
                  onChange={(event) => {
                    const startYear = event.target.value.replace(/\D/, "");
                    if (startYear.length <= 4) {
                      setStartYear(startYear);
                    }
                  }}
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      _search();
                      ev.preventDefault();
                    }
                  }}
                />
              </div>

              <div className="year">
                <TextField
                  id="standard-basic"
                  variant="standard"
                  label="Ano de término"
                  placeholder="opcional"
                  value={endYear}
                  onChange={(event) => {
                    const endYear = event.target.value.replace(/\D/, "");
                    if (endYear.length <= 4) {
                      setEndYear(endYear);
                    }
                  }}
                  onKeyPress={(ev) => {
                    if (ev.key === "Enter") {
                      _search();
                      ev.preventDefault();
                    }
                  }}
                />
              </div>
            </div>
          </form>
        </Col>
      </Row>

      {loadingIndicators && (
        <div className="loading">
          <ReactLoading type="bubbles" color="#49a7e2" height={100} />
        </div>
      )}

      {!loadingIndicators && studentsData && (
        <>
          <Row style={{ marginTop: 40 }}>
            <Col>
              <p className="title">Alunos formados no fluxo</p>
              <p className="indicator-number">
                <strong className="indicator-positive-number">
                  {studentsData.datasets[0].data[0]}
                </strong>
              </p>
            </Col>

            <Col>
              <p className="title">Alunos desistentes</p>
              <p className="indicator-number">
                <strong className="indicator-negative-number">
                  {studentsData.datasets[0].data[1]}
                </strong>
              </p>
            </Col>

            <Col>
              <p className="title">Alunos ativos</p>
              <p className="indicator-number">
                <strong className="indicator-active-number">
                  {studentsData.datasets[0].data[2]}
                </strong>
              </p>
            </Col>
          </Row>

          <div className="graph-content">
            <div className="graph">
              <Pie data={studentsData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
