import styled from "styled-components"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link , useNavigate} from "react-router-dom"

export default function SucessoPage(){
    const navigate = useNavigate();
    function fim(){
        navigate("/")
    }
    return(
        <Wrapper>
            <Header><h1>Pedido feito com sucesso!</h1></Header>
            
            <Titulo data-test="movie-info">
                Filme e sessão
                <h1> filme tal</h1>
            </Titulo>
            <Titulo data-test="seats-info">
                Ingressos
                <h1> assento tal</h1>
            </Titulo>
            <Titulo data-test="client-info">Comprador
                <h1> Nome:</h1>
                <h1> CPF:</h1>
            </Titulo>
            <Retornar data-test="go-home-btn" onClick={fim}>Voltar pra Home</Retornar>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 29px;
`

const Header = styled.div`
    color: #247A6B;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    letter-spacing: 0.04em;
    width: 374px;
    height: 110px;
    h1{
        width: 150px;
        font-weight: 700;
        margin-left: 90px;
    }
`

const Titulo = styled.div`
    color: #293845;
    font-weight: 700;
    font-size: 24px;
    h1{
        font-weight: 400;
        font-size: 22px;
    }
`

const Retornar = styled.button`
    width: 225px;
    height: 42px;
    background: #E8833A;
    border-radius: 3px;
    margin-left:50px;
    border: 0;
    color: #FFFFFF;
    font-size: 18px;
    margin-top: 62px;
`