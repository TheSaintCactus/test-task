import styled, { keyframes } from "styled-components"



const animation = keyframes`
    from {
        transform: rotate(0deg);
    }
 
    to {
        transform: rotate(360deg);
    }
`

const Spinner = styled.div`
    margin-top: 100px;
    height: 50px;
    width: 50px;
    border: 3px solid #81d1ff;
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: ${animation} 1s linear infinite;
`
 


export const LoadingSpinner = () => {

    return <>
    <Spinner></Spinner>
    <div>Загрузка...</div>
    </>
}