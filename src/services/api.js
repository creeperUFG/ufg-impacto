import axios from "axios";

export const projectsURL = "http://localhost:3344/university";
export const studentsURL = "http://localhost:3333/university";

const api = (baseURL) => {
  if (baseURL) {
    // Criamos uma nova instância apenas se foi passado uma nova baseURL
    // se ela for diferente da baseURL atual

    let axiosAppServer = axios.create({
      baseURL,
      timeout: 15000, // Não esqueça de passar as outras opções
    });

    return axiosAppServer;
  }
};

export default api;
