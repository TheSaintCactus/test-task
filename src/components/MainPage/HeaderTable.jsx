import styled from "styled-components";
import { QuestionCellContainer } from "./QuestionCell";

const HeaderTableStyled = styled(QuestionCellContainer)`
    box-sizing: content-box;
border: 1px solid #81d1ff;
  background-color: #81d1ff;
  font-weight: bold;
  align-items: center;
  justify-items: center;
  min-height: 50px;
  margin-bottom: -1px;
  &:hover {
    background-color: #81d1ff;

  }
`;

export const HeaderTable = () => {
  return (
    <HeaderTableStyled>
      <div>Автор вопроса</div>
      <div>Тема</div>
      <div>Количество ответов</div>
      <div>Теги</div>
    </HeaderTableStyled>
  );
};
