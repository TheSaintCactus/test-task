import { useSelector } from "react-redux";
import styled from "styled-components";
import { state } from "../../redux/selectors";
import { QuestionCell } from "./QuestionCell";


const TableWrapper = styled.section`
   border: 1px solid black;
`


export const QuestionsList = () => {

    let key = 0;

    const { questions } = useSelector(state)
    return <TableWrapper>{questions?.map(i => {
    return <QuestionCell key={key++} {...i}/>})
}</TableWrapper>
}