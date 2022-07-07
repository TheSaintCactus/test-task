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

const initialState = {
  questions: {},
  isLoading: false,
  serverErrors: null,
};

// eslint-disable-next-line default-param-last
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case setQuestionsArrayType:

      return {
        ...state,
        questions: action.payload,
      };
    case setQuestionType:
      return {
        ...state,
        question: action.payload,
      };

    case setAnswersType:
      return {
        ...state,
        answers: action.payload,
      }

    case setSearchQueryType:
      return {
        ...state,
        query: action.payload,
      }

      case clearQuestionStateType:
        return {
          ...state,
          question: null,
        };

    case loadingStartType:
      return {
        ...state,
        isLoading: true,
      };
    case loadingEndType:
      return {
        ...state,
        isLoading: false,
      };
    case errorCatchType:
      return {
        ...state,
        serverErrors: action.payload.errors,
      };
    default:
      return state;
  }
};
