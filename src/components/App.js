import { BrowserRouter, Routes, Route } from "react-router-dom"
import Topo from "./Topo.js"
import TelaInicial from "../pages/TelaInicial";
import FilmePage from "../pages/FilmePage"
import AssentosPage from "../pages/AssentosPage.js";
import SucessoPage from "../pages/SucessoPage.js";
import { useState } from "react";
export default function App() {
  const [dados, setDados] = useState({})


  return (
    <BrowserRouter>
      <Topo/>
      <Routes>
        <Route path="" element={<TelaInicial/>} /> 
        <Route path="/sessoes/:idFilme" element={<FilmePage/>}/>
        <Route path="/assentos/:idSessao" element={<AssentosPage/>}/>
        <Route path="/sucesso" element={<SucessoPage dados={dados}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

