import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export default function TelaInicial(){
    const [listaFilmes, setListaFilmes] = useState(undefined);

    useEffect(() => {
        const URL = "https://mock-api.driven.com.br/api/v8/cineflex/movies"
        const promise = axios.get(URL)
        promise.then(res => setListaFilmes(res.data))              
        promise.catch(err => console.log(err.response.data))  
      }, [])
    
      return (
        <div>
          <Wrapper>
            <Header>Selecione o filme</Header>
            <Lista>
              {listaFilmes.map(filme => (
                <Filme key={filme.id}>
                  <Link to={`/sessoes/${filme.id}`}>
                     <img src={filme.posterURL} alt={filme.name} />
                  </Link>
                </Filme>
               ))}
            </Lista>
          </Wrapper>
        </div>
       )
}

const Wrapper = styled.div`
    overflow: hidden;
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
const Lista = styled.div`
    display: flex;
    flex-wrap: wrap;
    
`
const Filme = styled.div`
    width: 145px;
    height: 209px;
    margin-bottom: 11px;
    margin-left: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    img {
        width: 129px;
        height: 193px;
        object-fit: cover;
    }
`