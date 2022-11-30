import { createContext, useReducer } from "react";
import styled from "@emotion/styled";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import Layout from "./Layout";
import { Details } from "pages/Details";
import { MovieList, MoviesType } from "pages/MovieList";
import { MyList } from "pages/MyList";

import "./App.css";
interface ContextType {
  state: MoviesType[];
  dispatch: React.Dispatch<{ type: string; value: unknown }>;
}

const NotFound = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: auto;
  justify-content: center;
  align-items: center;
`;
const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "";

export const client = axios.create({
  baseURL: REACT_APP_API_URL,
});

const NoPage = () => (
  <NotFound>
    <span>404 Not Found</span>
    <Link to="/">Go Back</Link>
  </NotFound>
);

const initialState: MoviesType[] = JSON.parse(
  localStorage?.getItem("list") || "[]"
);
export const MovieContext = createContext<ContextType>({
  state: [],
  dispatch: () => {},
});
const reducer = (state: MoviesType[], action: any) => {
  switch (action.type) {
    case "ADD_MOVIE":
      const addedState = [...new Set([...state, action.value])];
      localStorage.setItem("list", JSON.stringify(addedState));

      return addedState;
    case "DELETE_MOVIE":
      const deletedState = state.filter(
        (movie) => movie.imdbID !== action.value.imdbID
      );
      localStorage.setItem("list", JSON.stringify(deletedState));

      return deletedState;
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MovieList />} />
            <Route path="my-list" element={<MyList />} />
            <Route path="movies/:id" element={<Details />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MovieContext.Provider>
  );
}

export default App;
