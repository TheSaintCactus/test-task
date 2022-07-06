/* eslint-disable react-hooks/exhaustive-deps */

import styled from 'styled-components';

import { Route, Routes } from 'react-router';
import { MainPage } from '../pages/MainPage';
import { QuestionPage } from '../pages/QuestionPage';



const AppContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  width: 99%;
  max-width: 1200px;
`

const Wrapper = styled.div`
display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
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


