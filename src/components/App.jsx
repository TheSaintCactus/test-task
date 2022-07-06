/* eslint-disable react-hooks/exhaustive-deps */

import styled from 'styled-components';

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


