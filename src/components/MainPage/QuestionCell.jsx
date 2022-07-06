import styled from "styled-components";
import { decode } from "html-entities";
import { Link } from "react-router-dom";

const LinkStyled = styled(Link)`
display: block;
  &:focus {
    position: relative;
    box-shadow: 0px 0px 20px 7px #81d1ff;
  }
    text-decoration: none;
`

export const QuestionCellContainer = styled.div`
  display: grid;
  grid-template-columns: 22.64% 45.29% 13.59% 18.12%;
  box-sizing: border-box;
  gap: 1px;
  background-color: white;
  margin-bottom: 1px;
  color: black;

  &:hover {
    background-color: #dfdfdf;
  }
`;

const GridElement = styled.div`
  box-sizing: border-box;
  align-self: center;
  justify-self: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  outline: 1px solid black;
  font-size: 2vh ;
  word-break: break-word;

`;

const Author = styled(GridElement)`
  color: #0393cc;
`

const Title = styled(GridElement)`
 color: #04a004;
 text-decoration: none;

`
const TagWrapper = styled(GridElement)`
display: flex;
flex-direction: column;
align-items: flex-start;
`

const TagsStyle = styled.div`
  background-color: gray;
  display: inline-block;
  border-radius: 8px;
  margin-bottom: 5px;
  color: white;
  padding: 4px;

`

export const QuestionCell = (props) => {


  const link = `/questions/${props.question_id}`;


  let key = 0;
  return (
    <LinkStyled to={link}>
    <QuestionCellContainer>
      <Author>{props.owner.display_name}</Author>
      <Title>{decode(props.title)}</Title>
      <GridElement>{props.answer_count}</GridElement>
      <TagWrapper>
        {props.tags.map((i) => (
          <TagsStyle key={key++}>{`#${i}`}</TagsStyle>
        ))}
      </TagWrapper>
    </QuestionCellContainer>
    </LinkStyled>
  );
};
