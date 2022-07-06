/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getQuestion } from "../redux/actions";
import { state } from "../redux/selectors";
import parse from 'html-react-parser';
import styled from "styled-components";
import DOMPurify from "dompurify";
import { AnswersList } from "../components/QuestionPage/AnswersList";

const Author = styled.h1`
    margin-top: 20px;
    display: block;
    text-align: center;
`
const Wrapper = styled.div`
    width: 100%;
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
const QuestionWrapper = styled.div`
margin-top: 50px;
border-radius: 15px;
background-color: #BECCCD;
padding: 20px;
margin-bottom: 50px;

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

export const QuestionPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const { question } = useSelector(state)
    useEffect(() => {
        dispatch(getQuestion(id))
    }, [id])

  let key = 0
  let key2 = 0
if (question) {
    return<Wrapper> <QuestionWrapper>
    
    <Author>{question.owner.display_name}</Author>
    <TagsContainer>{
        question.tags.map((tag) => <Tag key={key++}>#{tag}</Tag>)
}</TagsContainer>
    <Title>{parse(DOMPurify.sanitize(question.title))}</Title>
    
    <div >{question?.body && parse(DOMPurify.sanitize(question.body))}</div>
    <br/>
    <br/>
    <h2>Comments:</h2>
    <div>{question.comments?.map((item) => {
        return (
            <Comment key={key2++}>
            <h3>{item.owner.display_name}</h3>
            <div>{parse(DOMPurify.sanitize(item.body))}</div>
            </Comment>
        )
    })}</div>
    </QuestionWrapper>
    <AnswersList/>
    </Wrapper>
}
return null
}