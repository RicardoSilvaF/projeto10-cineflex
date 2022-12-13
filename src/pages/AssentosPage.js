import styled from "styled-components"
import axios from "axios"
import { useEffect, useState, React } from "react"
import { useParams } from "react-router-dom"
import {VERDE, CINZA, AMARELO} from "../styles/Cores"
import { Link , useNavigate} from "react-router-dom"

export default function AssentosPage(){
    const { idSessao } = useParams()
    const [sala, setSala] = useState(undefined)
    const [selecionados, setSelecionados] = useState([])
    const [nome, setNome] = useState("")
    const [cpf, setCpf] = useState("")
    const navigate = useNavigate();
    const [dados, setDados] = useState()
    
    
    function finalizarCompra(){
        if(selecionados.length == 0){
            alert("Selecione um assento")
        }
        else{
            let aux = {filme:idSessao.movie.title, day:idSessao.day.date, hora:idSessao.name}
            setDados(aux)
            navigate('/sucesso', {dados})
        }
    }
    function alertaIndisponivel(){
        alert("Esse assento não está disponível")
    }

    const selecionarCadeira = (cadeiraEscolhida) => {
        if(selecionados.includes(cadeiraEscolhida)){
            let aux = -1;
            for(let i=0;i<selecionados.length;i++){
                if(selecionados[i] === cadeiraEscolhida){
                    aux=i;
                    selecionados.splice(i,1);
                    setSelecionados(selecionados => [...selecionados]);
                    break;
                }
            }
        }
        else{
            setSelecionados(selecionados => [...selecionados, cadeiraEscolhida]);
        }
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        promise.then((res) => setSala(res.data))
        promise.catch((err) => console.log(err.response.data))
      }, [])

    if (sala === undefined) {
      return <div>Carregando...</div>
    }

    return(
        <Wrapper>
            <Header>Selecione o(s) assentos(s)</Header>

            <Assentos>
            {sala.seats.map((chair) => {
                if(chair.isAvailable === false){
                    return(
                        <CadeiraInd onClick={alertaIndisponivel} className={"indisponivel"}>{chair.name}</CadeiraInd>
                    )
                }
                else{
                    return (
                        <Cadeira 
                            id={chair.id}
                            className={selecionados.includes(chair.id) ? "selecionado" : "naoSelecionado"}
                            onClick={() => selecionarCadeira(chair.id)}
                            >
                                {chair.name}
                        </Cadeira>
                    )
                }
            })}
            </Assentos>

            <Legendas>
                <Legenda>
                    <BolaVerde></BolaVerde>
                    <TextoLegenda>Selecionado</TextoLegenda>
                </Legenda>
                <Legenda>
                    <BolaLegenda></BolaLegenda>
                    <TextoLegenda>Disponível</TextoLegenda>
                </Legenda>
                <Legenda>
                    <BolaAmarela></BolaAmarela>
                    <TextoLegenda>Indisponível</TextoLegenda>
                </Legenda>
            </Legendas>
            
            <form onSubmit={finalizarCompra}>
                <Wrapper>
                    <ContainerInputs>
                        <h1>Nome do comprador:</h1>
                        <input type="text"
                            placeholder="Digite seu nome..." 
                            value={nome} onChange={e => setNome(e.target.value)}
                            required
                        />
                        <h1>CPF do comprador:</h1>
                        <input type="text"
                            placeholder="Digite seu CPF..." 
                            value={cpf} onChange={e => setCpf(e.target.value)}
                            required
                        />
                    </ContainerInputs>
                    
                    <ReservarAssentos>
                            Reservar Assento(s)
                    </ReservarAssentos>
                    
                </Wrapper>
            </form>

            <Footer data-test="footer">
                <ImagemFooter>
                    <img src={sala.movie.posterURL} alt={sala.movie.title}/>
                </ImagemFooter>
                <Texto>
                    <p>{sala.movie.title}</p>
                    <p>{sala.day.weekday} - {sala.name}</p>
                </Texto>
            </Footer>
        </Wrapper>
    )
}



const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const Header = styled.div`
    width: 100%;
    height: 91px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #293845;
    font-size: 24px;
    letter-spacing: 0.04em;
`

const Footer = styled.div`
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #DFE6ED;
    border: 1px solid #9EADBA;
    width: 100%;
    height: 117px;
    display: flex;
    align-items: center;
`

const ImagemFooter = styled.div`
    width: 64px;
    height: 89px;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    margin-left: 10px;
    margin-right: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 48px;
        height: 72px;
    }
`

const Texto = styled.div`
    font-size: 26px;
    color: #293845;
`

const Assentos = styled.div`
    height: 203px;
    width: 334px;
    display: flex;
    flex-wrap: wrap;
    margin-left: 24px; 
`

const Cadeira = styled.button`
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #808F9D;
    border-radius: 12px;
    margin-right: 7px;
    margin-bottom: 18px;
    font-size: 11px;
    :hover{
        cursor: pointer;
    }
    background-color: ${props => {
        switch(props.className){
            case "selecionado":
                return VERDE
            case "indisponivel":
                return AMARELO
            default:
                return CINZA
        }
    }}
`

const Legenda = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const BolaLegenda = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 17px;
    background: #C3CFD9;
    border: 1px solid #7B8B99;
`

const BolaVerde = styled(BolaLegenda)`
    border: 1px solid #0E7D71;
    background-color:#1AAE9E;
`

const BolaAmarela = styled(BolaLegenda)`
    border: 1px solid #F7C52B;
    background-color:#FBE192;
`

const TextoLegenda = styled.div`
    color: #4E5A65;
    font-size: 13px;
    margin-top: 5px;
`

const Legendas = styled.div`
    width: 375px;
    display: flex;
    justify-content: space-around;
    padding: 0 30px;
    margin-top: 16px;
`

const CadeiraInd = styled(Cadeira)`
    border: 1px solid #F7C52B;
`

const ContainerInputs = styled.div`
    margin-top: 41px;
    margin-left: 24px;
    h1 {
        font-size: 18px;
        color: #293845;
    }
    input {
        width: 324px;
        height: 51px;
        font-size: 18px;
        padding-left: 18px;
        margin-bottom: 7px;
    }
`

const ReservarAssentos = styled.button`
    width: 225px;
    height: 42px;
    display:flex;
    justify-content: center;
    align-items: center;
    color: #FFFFFF;
    background-color: #E8833A;
    border-radius: 3px;
    font-size: 18px;
    margin-left:72px;
    margin-top: 50px;
    border: 0;
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`
