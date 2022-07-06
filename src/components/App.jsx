/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { getQuestions } from '../redux/actions';
import { QuestionsList } from './MainPage/QuestionsList';
import { SearchForm } from './MainPage/SearchForm';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { HeaderTable } from './MainPage/HeaderTable';
import styled from 'styled-components';
import { LoadingSpinner } from './LoadingSpinner';
import { state } from '../redux/selectors';
import { SortButtons } from './MainPage/SortButtons'
import { Route, Routes } from 'react-router';
import { MainPage } from '../pages/MainPage';
import { QuestionPage } from '../pages/QuestionPage';



const AppContainer = styled.div`
width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  
`

const Wrapper = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  width: 1104px;
`

export const App = () => {

  


  return (
    <AppContainer >
      <Wrapper>
      <Routes>
      <Route path="/" element={<MainPage/>} />
      <Route path="/questions" element={<MainPage/>} />
      <Route path='/questions/:id' element={<QuestionPage/>} />
      </Routes>
     </Wrapper>
    </AppContainer>
  );
}


