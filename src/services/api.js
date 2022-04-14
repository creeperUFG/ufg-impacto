import axios from "axios";

export const projectsURL =
  "https://ufg-impacto-projects-service.herokuapp.com/university";
export const studentsURL =
  "https://ufg-impacto-students-service.herokuapp.com/university";

const api = (baseURL) => {
  if (baseURL) {
    // Criamos uma nova instância apenas se foi passado uma nova baseURL
    // se ela for diferente da baseURL atual

    let axiosAppServer = axios.create({
      baseURL,
    });

    return axiosAppServer;
  }
};

export default api;
