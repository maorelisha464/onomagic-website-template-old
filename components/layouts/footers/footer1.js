import styled from "styled-components";


const FooterWrapper = styled.div`
width: 100%;
    height: 350px;
    text-align: center;
    color: white;
    font-size: 100px;
    background: rgb(168,223,235);
    background: linear-gradient(90deg, rgba(168,223,235,1) 0%, rgba(109,183,210,1) 44%, rgba(159,207,217,1) 100%);
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function Footer1({ }) {
    return (
        <>
            <FooterWrapper>Footer</FooterWrapper>
        </>
    )
}