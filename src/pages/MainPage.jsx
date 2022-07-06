/* eslint-disable react-hooks/exhaustive-deps */

import { useSelector } from "react-redux";
import { state } from "../redux/selectors";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { HeaderTable } from "../components/MainPage/HeaderTable";
import { QuestionsList } from "../components/MainPage/QuestionsList";
import { SearchForm } from "../components/MainPage/SearchForm";
import { MemoizedSortButtons } from "../components/MainPage/SortButtons";

export const MainPage = () => {
  const { isLoading, questions, serverErrors } = useSelector(state);

  const content =
    questions?.length > 0 && !serverErrors ? (
      <>
        <HeaderTable />
        <QuestionsList />
      </>
    ) : (
      "Введите вопрос"
    );
  return (
    <>
      <SearchForm />
      <MemoizedSortButtons />
      {isLoading ? <LoadingSpinner /> : 
      <>
      {content}
      </>
      }
    </>
  );
};
