/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router";
import { getAnswers } from "../../redux/actions";
import { state } from "../../redux/selectors";
import { Answer } from "./Answer";





export const AnswersList = () => {
    
    const dispatch = useDispatch()
    const { id } = useParams();
    const { answers } = useSelector(state)

useEffect(() => {
    dispatch(getAnswers(id))
}, [id])
let key = 0;

if (answers && Array.isArray(answers)) {
    return <> <h1>
        Answers:
    </h1>
    <div>
    {answers?.map(item => <Answer key={key++}{...item}/>)}

    </div>
    </>
}
return null
}