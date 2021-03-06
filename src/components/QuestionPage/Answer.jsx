import DOMPurify from "dompurify"
import styled from "styled-components"
import parse from 'html-react-parser';


const Author = styled.h2`
margin-top: 20px;
display: block;
`

const Wrapper = styled.div`
margin-top: 50px;
border-radius: 15px;
background-color: #BECCCD;
padding: 20px;
margin-bottom: 50px;
max-width: 1200px;
`
const Title = styled.h2`
text-align: center;
margin: 10px;
`
const Comment = styled.div`
padding-top: 10px;
padding-bottom: 10px;
border-top: 1px solid gray;
`

export const Answer = (props) => {
let key = 0

    return  <Wrapper>
    
    <Author>{parse(DOMPurify.sanitize(props.owner.display_name))}</Author>
    <Title>{parse(DOMPurify.sanitize(props.title))}</Title>
    
    <div >{props?.body && parse(DOMPurify.sanitize(props.body))}</div>
    <br/>
    <br/>
    {props.comments && <h2>Comments:</h2>}
    <div>{props.comments?.map((item) => {
        return (
            <Comment key={key++}>
            <h3>{parse(DOMPurify.sanitize(item.owner.display_name))}</h3>
            <div>{parse(DOMPurify.sanitize(item.body))}</div>
            </Comment>
        )
    })}</div>
    </Wrapper>
}