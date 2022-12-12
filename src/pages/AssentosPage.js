import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function AssentosPage(){
    const { idSessao } = useParams()
    const [sala, setSala] = useState(undefined)

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)
        promise.then((res) => setSala(res.data))
        promise.catch((err) => console.log(err.response.data))
      }, [])

    if (sala === undefined) {
      return <div>Carregando...</div>
    }
    console.log(sala.seats)
    return(
        <Wrapper>
            <Header>Selecione o(s) assentos(s)</Header>

            <Assentos>
            {sala.seats.map((chair) => {
                if(chair.isAvailable === false){
                    return(
                        <CadeiraInd>{chair.name}</CadeiraInd>
                    )
                }
                else{
                    return (
                        <Cadeira>{chair.name}</Cadeira>
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
    height: 110px;
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

const Cadeira = styled.div`
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #C3CFD9;
    border: 1px solid #808F9D;
    border-radius: 12px;
    margin-right: 7px;
    margin-bottom: 18px;
    font-size: 11px;
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
    background: #1AAE9E;
    border: 1px solid #0E7D71;
`

const BolaAmarela = styled(BolaLegenda)`
    background: #FBE192;
    border: 1px solid #F7C52B;
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
    background: #FBE192;
    border: 1px solid #F7C52B;
`