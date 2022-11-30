import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { MoviesType } from "pages/MovieList";

type CardPropType = {
  movies: MoviesType[];
};

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1em;
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
  }
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  background: whitesmoke;
  padding: 1em;
  box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.2);
`;

const Button = styled.button`
  padding: 1em;
  margin-top: 1em;
  border: none;
  background: teal;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

export const Card = ({ movies }: CardPropType) => {
  return (
    <Container>
      {movies.map((mov, key) => (
        <MovieCard key={key}>
          <img src={mov.Poster} alt="" />
          <span>{mov.Title}</span>
          <small>
            {mov.Type} - {mov.Year}
          </small>
          <Link to={`/movies/${mov.imdbID}`}>
            <Button onClick={() => {}}>Details</Button>
          </Link>
        </MovieCard>
      ))}
    </Container>
  );
};
