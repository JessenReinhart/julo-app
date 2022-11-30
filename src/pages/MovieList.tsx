import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { client } from "App";
import { Card } from "components/Card";
import { Loader } from "components/Loader";

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

export const Section = styled.section`
  padding: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;
  .endlist {
    background: rgba(0, 0, 0, 0.6);
    padding: 1em;
  }
`;

export const MovieList = () => {
  const [movies, setMovies] = useState<MoviesType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const reachedBottom = useBottomDetect();
  useEffect(() => {
    if (reachedBottom) setPage(page + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reachedBottom]);

  useEffect(() => {
    const getData = async () => {
      const { data } = await client.get<MovieResponseType>("", {
        params: {
          s: "batman",
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
  }, [page]);

  return (
    <Section>
      <h3>Movie List</h3>
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
