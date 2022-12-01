import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { client } from "App";
import { Card } from "components/Card";
import { Loader } from "components/Loader";

import useBottomDetect from "hooks/useBottomDetect";
import { getFormData } from "helpers";

export type MoviesType = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

type MovieResponseType = {
  Response: string;
  Search: MoviesType[];
  totalResults: string;
};

export const Section = styled.section`
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  form {
    display: flex;
    flex-direction: row;
    gap: 1em;
    width: 100%;
    * {
      padding: 0.5em 1em;
      box-sizing: border-box;
    }
    input {
      flex-grow: 1;
    }
    button {
      border: none;
      background: #a80038;
      color: white;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .endlist {
    background: rgba(0, 0, 0, 0.6);
    padding: 1em;
  }
`;

export const MovieList = () => {
  const [movies, setMovies] = useState<MoviesType[]>([]);
  const [query, setQuery] = useState<string>("batman");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const reachedBottom = useBottomDetect();
  useEffect(() => {
    if (reachedBottom && movies.length > 0) setPage(page + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reachedBottom]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await client.get<MovieResponseType>("", {
        params: {
          s: query,
          page,
        },
      });
      setLoading(false);
      setMovies(
        movies.length
          ? (prevData) => [...new Set([...prevData, ...data.Search])]
          : data.Search
      );
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { formquery } = getFormData(e);
    if (formquery.length < 3)
      alert("Keyword must be at least 3 characters long.");
    else {
      setMovies([]);
      setLoading(true);
      setPage(1);
      setQuery(formquery);
    }
  };

  return (
    <Section>
      <h3>Movie List</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="formquery" placeholder="Search Movie..." />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Card movies={movies} />
          <span className="endlist">Loading...</span>
        </>
      )}
    </Section>
  );
};
