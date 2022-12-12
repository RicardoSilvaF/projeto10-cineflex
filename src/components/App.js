import { BrowserRouter, Routes, Route } from "react-router-dom"
import Topo from "./Topo.js"
import TelaInicial from "../pages/TelaInicial";
import FilmePage from "../pages/FilmePage"
import AssentosPage from "../pages/AssentosPage.js";

export default function App() {


  return (
    <BrowserRouter>
      <Topo/>
      <Routes>
        <Route path="" element={<TelaInicial/>} /> 
        <Route path="/sessoes/:idFilme" element={<FilmePage/>}/>
        <Route path="/assentos/:idSessao" element={<AssentosPage/>}/>
        <Route path="/sucesso"/>
      </Routes>
    </BrowserRouter>
  );
}

