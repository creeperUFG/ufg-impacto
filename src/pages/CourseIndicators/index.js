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
  const [year, setYear] = useState("");
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
    if (course && year) {
      setLoadingIndicators(true);
      try {
        const indicators = await api(studentsURL).get(
          `/students/number/course/${course}/year/${year}`
        );
        const activeStudents = await api(studentsURL).get(
          `/students/active/course/${course}`
        );

        setStudentsData({
          labels: ["Formados", "Desistentes"],
          datasets: [
            {
              label: "# of Votes",
              data: [
                indicators.data.graduatedStudents,
                indicators.data.dropoutStudents,
              ],
              backgroundColor: ["#228B22", "#DC143C"],
              year: indicators.data.year,
              activeStudents: activeStudents.data.activeStudents,
            },
          ],
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingIndicators(false);
      }
    } else {
      alert("Informe o curso e o ano.");
    }
  };

  const _searchQuota = async () => {
    if (course && year) {
      setLoadingQuotaIndicators(true);
      try {
        const indicators = await api(studentsURL).get(
          `/quota/students/number/course/${course}/year/${year}`
        );
        const activeStudents = await api(studentsURL).get(
          `/quota/students/active/course/${course}`
        );

        setQuotaStudentsData({
          labels: ["Formados", "Desistentes"],
          datasets: [
            {
              label: "# of Votes",
              data: [
                indicators.data.graduatedQuotaStudents,
                indicators.data.dropoutQuotaStudents,
              ],
              backgroundColor: ["#228B22", "#DC143C"],
              year: indicators.data.year,
              activeStudents: activeStudents.data.activeStudents,
            },
          ],
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoadingQuotaIndicators(false);
      }
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
                  style={{ color: "#49a7e2", width: "100%" }}
                />
              )}
            />

            <TextField
              id="standard-basic"
              variant="standard"
              label="Ano"
              placeholder="opcional"
              value={year}
              onChange={(event) => {
                const year = event.target.value.replace(/\D/, "");
                if (year.length <= 4) {
                  setYear(year);
                }
              }}
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  _search();
                  _searchQuota();
                  ev.preventDefault();
                }
              }}
            />
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
            <div className="active-students">
              <p className="title">Alunos ativos hoje</p>
              <p className="indicator-number">
                <strong className="indicator-normal-number">
                  {studentsData.datasets[0].activeStudents}
                </strong>
              </p>
            </div>
          </Row>

          <Row style={{ marginTop: 40 }}>
            <Col>
              <p className="title">
                Alunos formados em {studentsData.datasets[0].year}
              </p>
              <p className="indicator-number">
                <strong className="indicator-positive-number">
                  {studentsData.datasets[0].data[0]}
                </strong>
              </p>
            </Col>

            <Col>
              <p className="title">
                Alunos desistentes de {studentsData.datasets[0].year}
              </p>
              <p className="indicator-number">
                <strong className="indicator-negative-number">
                  {studentsData.datasets[0].data[1]}
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

      {loadingQuotaIndicators && (
        <div className="loading">
          <ReactLoading type="bubbles" color="#49a7e2" height={100} />
        </div>
      )}

      {!loadingQuotaIndicators && quotaStudentsData && (
        <>
          <Row style={{ marginTop: 80 }}>
            <div className="active-students">
              <p className="title">
                Alunos ativos ingressantes por ações afirmativas
              </p>
              <p className="indicator-number">
                <strong className="indicator-normal-number">
                  {quotaStudentsData.datasets[0].activeStudents}
                </strong>
              </p>
            </div>
          </Row>

          <Row style={{ marginTop: 40 }}>
            <Col>
              <p className="title">
                Alunos ingressantes por ações afirmativas formados em{" "}
                {quotaStudentsData.datasets[0].year}
              </p>
              <p className="indicator-number">
                <strong className="indicator-positive-number">
                  {quotaStudentsData.datasets[0].data[0]}
                </strong>
              </p>
            </Col>

            <Col>
              <p className="title">
                Alunos ingressantes por ações afirmativas desistentes de{" "}
                {quotaStudentsData.datasets[0].year}
              </p>
              <p className="indicator-number">
                <strong className="indicator-negative-number">
                  {quotaStudentsData.datasets[0].data[1]}
                </strong>
              </p>
            </Col>
          </Row>

          <div className="graph-content">
            <div className="graph">
              <Pie data={quotaStudentsData} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
