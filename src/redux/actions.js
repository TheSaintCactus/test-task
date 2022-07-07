/* eslint-disable no-alert */
/* eslint-disable no-prototype-builtins */
import { apiKey, apiUrl } from "../config";
import {require} from 'axios'
import {
    errorCatchType,
    loadingEndType,
    loadingStartType,
    setQuestionsArrayType,
    setQuestionType,
    clearQuestionStateType,
    setAnswersType,
    setSearchQueryType,
} from "./action-types";

const axios = require('axios').default;


export const setQuestionsArray = (payload) => ({type: setQuestionsArrayType, payload})

export const setQuestion = (payload) => ({type: setQuestionType, payload})

export const clearQuestionState = () => ({type: clearQuestionStateType})

export const loadingStart = () => ({ type: loadingStartType });

export const loadingEnd = () => ({ type: loadingEndType });

export const errorCatch = (payload) => ({ type: errorCatchType, payload });

export const setAnswers = (payload) => ({type: setAnswersType, payload})

export const setSearchQuery = (payload) => ({type: setSearchQueryType, payload})

export const getQuestions = (query, method = 'activity', order = 'desc') => async (dispatch) => {
    dispatch(loadingStart())
    axios.get(`${apiUrl}search/advanced?key=${apiKey}&q=${query}&page=1&order=${order}&sort=${method}&site=stackoverflow&filter=!ak79D-_Fo1F9X4`)
    .then(function (response) {
      dispatch(setQuestionsArray(response.data.items))
      dispatch(loadingEnd())
    })
    .catch(function (error) {
        dispatch(loadingEnd())
      console.log(error);
    })
}

export const getQuestion = (id) => async (dispatch) => {
  dispatch(loadingStart())
  axios.get(`${apiUrl}questions/${id}?order=desc&filter=!*MZqiH2lW.oleSF_&sort=activity&site=stackoverflow`)
  .then(function (response) {
    dispatch(setQuestion(response.data.items[0]))
    dispatch(loadingEnd())
  })
  .catch(function (error) {
      dispatch(loadingEnd())
    console.log(error);
  })
}

export const getAnswers = (id) => async (dispatch) => {
  dispatch(loadingStart())
  axios.get(`${apiUrl}questions/${id}/answers?order=desc&sort=votes&site=stackoverflow&filter=!)rp__SP*0y4wQG6)t8oX`)
  .then(function (response) {
    dispatch(setAnswers(response.data.items))
    dispatch(loadingEnd())
  })
  .catch(function (error) {
      dispatch(loadingEnd())
    console.log(error);
  })
}

