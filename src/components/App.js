import { BrowserRouter, Routes, Route } from "react-router-dom"
import Topo from "./Topo.js"
import TelaInicial from "../pages/TelaInicial";
import FilmePage from "../pages/FilmePage"

export default function App() {


  return (
    <BrowserRouter>
      <Topo/>
      <Routes>
        <Route path="" element={<TelaInicial/>} /> 
        <Route path="/sessoes/:idFilme" element={<FilmePage/>}/>
        <Route path="/assentos/:idSessao"/>
        <Route path="/sucesso"/>
      </Routes>
    </BrowserRouter>
  );
}

