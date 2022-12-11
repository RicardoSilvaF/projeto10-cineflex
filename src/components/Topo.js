import styled from "styled-components";

export default function Topo(){
    return(
        <Header>
            <Logo>
                CINEFLEX
            </Logo>
        </Header> 
    )
}

const Header = styled.div`
    background-color: #C3CFD9;
    height: 67px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Logo = styled.div`
    color: #E8833A;
    font-size:34px;
`