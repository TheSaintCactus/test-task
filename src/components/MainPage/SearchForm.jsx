import { useDispatch } from "react-redux"
import styled from "styled-components"
import { getQuestions, setSearchQuery } from "../../redux/actions"
const FormStyled = styled.form`
margin-top: 10px;
width: 100%;
margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const InputStyled = styled.input`
width: 100%;
padding: 10px;
margin-bottom: 10px;

`
const ButtonStyled = styled.button`
width: 100px;
box-sizing: border-box;
border-radius: 0;
border: none;
padding: 10px;
background-color: #3A3A94;
color: white;
&:hover {
    filter: brightness(1.4);
    cursor: pointer;
}
&:active {
    transform: translate(0, 4px);
}
`

export const SearchForm = () => {

    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(setSearchQuery(e.target[0].value))
       dispatch(getQuestions(e.target[0].value))
       
    }

    return <FormStyled onSubmit={handleSubmit}>
        <InputStyled type='text' placeholder="Введите свой вопрос"/>
        <ButtonStyled type="submit" >Поиск</ButtonStyled>
    </FormStyled>
}