import { BrowserRouter, Routes, Route } from "react-router-dom"
import Topo from "./Topo.js"

export default function App() {
  return (
    <BrowserRouter>
      <Topo/>
      <Routes>
        {/*<Route path="/"/> 
        <Route path="/sessoes/:idFilme"/>
        <Route path="/assentos/:idSessao"/>
        <Route path="/sucesso"/>*/}
      </Routes>
    </BrowserRouter>
  );
}

