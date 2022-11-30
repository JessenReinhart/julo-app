import styled from "@emotion/styled";
import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";

import { client, MovieContext } from "App";
import { Loader } from "components/Loader";
import { MoviesType } from "./MovieList";

type MovieDetailType = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings?: RatingsEntity[] | null;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
};
type RatingsEntity = {
  Source: string;
  Value: string;
};

export const Details = () => {
  const [data, setData] = useState<MovieDetailType | null>(null);
  const { state, dispatch } = useContext(MovieContext);

  const { id } = useParams();
  const isSaved = state.some((mov: MoviesType) => mov.imdbID === data?.imdbID);

  const MovieDetail = styled.div`
    .hero {
      width: 100%;
      height: 800px;
      object-fit: cover;
      position: relative;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .info-container {
      position: absolute;
      box-sizing: border-box;
      bottom: 0;
      left: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5em;
      padding: 1em;
      background: rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(5px);
      h1 {
        margin: 0;
      }

      button {
        padding: 1em;
        margin-top: 1em;
        border: none;
        background: ${isSaved ? "white" : "#a80038"};
        color: ${isSaved ? "#2b2024" : "white"};
        font-weight: bold;
        cursor: pointer;
      }
    }

    .description {
      padding: 1em;
    }
  `;

  const handleSave = () => {
    dispatch({
      type: isSaved ? "DELETE_MOVIE" : "ADD_MOVIE",
      value: {
        Title: data?.Title,
        Year: data?.Year,
        imdbID: data?.imdbID,
        Type: data?.Type,
        Poster: data?.Poster,
      },
    });
  };

  useEffect(() => {
    const getData = async () => {
      const { data } = await client.get("", {
        params: {
          i: id,
        },
      });
      setData(data);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) return <Loader />;
  return (
    <MovieDetail>
      <div className="hero">
        <img src={data.Poster} alt="" />
        <div className="info-container">
          <h1>{data.Title}</h1>
          <span>
            {data.Year} - {data.Runtime}
          </span>
          <span>{data.Actors}</span>
          <small>{data.Genre}</small>
          <button onClick={handleSave}>
            {isSaved ? "Remove" : "Save"} Movie
          </button>
        </div>
      </div>
      <div className="description">
        <span>IMDB Rating: {data.imdbRating}</span>
        <p>{data.Plot}</p>
      </div>
    </MovieDetail>
  );
};
