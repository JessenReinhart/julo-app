import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { client } from "App";
import { Card } from "components/Card";

import useBottomDetect from "hooks/useBottomDetect";

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

const Section = styled.section`
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

export const MovieList = () => {
  const [movies, setMovies] = useState<MoviesType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = async (s: string, page: number) => {
    const { data } = await client.get<MovieResponseType>("", {
      params: {
        s,
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

  const reachedBottom = useBottomDetect();
  useEffect(() => {
    if (reachedBottom) setPage(page + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reachedBottom]);

  useEffect(() => {
    getData("batman", page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Section>
      <h3>Movie List</h3>
      {loading ? "loading" : <Card movies={movies} />}
    </Section>
  );
};
