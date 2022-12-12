import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function FilmePage(){
    const { idFilme } = useParams()
    const [filme, setFilme] = useState(undefined)
    const [horarios, setHorarios] = useState([])

    useEffect(() => {
      const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)
      promise.then((res) => setFilme(res.data))
      promise.catch((err) => console.log(err.response.data))
    }, [])
  
    if (filme === undefined) {
      return <div>Carregando...</div>
    }
    
    return (
        <div>
          <Wrapper>
            <Header>Selecione o horário</Header>

            {filme.days.map((dias) => {
                return (
                    <div>
                    <Dia>{dias.weekday} - {dias.date}</Dia>
                    <Horarios>
                        {dias.showtimes.map((horas) => {
                            return (
                                <Hora>{horas.name}</Hora>
                            );
                        })}
                    </Horarios>
                 </div>
                );
            })}

            <Footer>
                <ImagemFooter>
                    <img src={filme.posterURL} alt={filme.title}/>
                </ImagemFooter>
                <Texto>{filme.title}</Texto>
            </Footer>
          </Wrapper>
        </div>
      )
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
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

const Texto = styled.div`
    font-size: 26px;
    color: #293845;
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

const Dia = styled.div`
    display: flex;
    font-size: 20px;
    letter-spacing: 0.02em;
    color: #293845;
`

const Hora = styled.div`
    width: 83px;
    height: 43px;  
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.02em;
    color: #FFFFFF;
    background-color: #E8833A;
    border-radius: 3px;
    margin-right: 8px;
`

const Horarios = styled.div`
    display: flex;    
    margin-bottom: 23px;
    margin-top: 22px;
`