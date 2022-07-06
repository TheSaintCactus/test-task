import { useSelector } from "react-redux";
import { state } from "../../redux/selectors";
import { QuestionCell } from "./QuestionCell";




export const QuestionsList = () => {

    let key = 0;

    const { questions } = useSelector(state)
    return questions?.map(i => {
    return <QuestionCell key={key++} {...i}/>})
}