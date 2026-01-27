import axios from "axios";

const api = axios.create({
  baseURL: "https://6977f6b85b9c0aed1e87c204.mockapi.io/",/*sinon on met "https://6977f6b85b9c0aed1e87c204.mockapi.io/books"
  et dans le  code on fait   useEffect(() => {
      api.get("/").then((res) ou .get() => {
        setBooks(res.data); 
      });
    }, []);*/
});

export default api;
