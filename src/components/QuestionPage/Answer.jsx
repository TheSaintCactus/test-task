import DOMPurify from "dompurify"
import styled from "styled-components"
import parse from 'html-react-parser';


const Author = styled.h2`
margin-top: 20px;
display: block;
`

const TagsContainer = styled.div`
margin-top: 20px;
display: flex;
justify-content: center;
`
const Tag = styled.div`
background-color: gray;
display: inline-block;
border-radius: 8px;
margin-bottom: 5px;
color: white;
padding: 4px;
margin-right: 20px;
`
const Wrapper = styled.div`
margin-top: 50px;
border-radius: 15px;
background-color: #BECCCD;
padding: 20px;
width: 1104px;

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