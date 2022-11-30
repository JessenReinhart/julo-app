import { useNavigate } from "react-router";
import styled from "@emotion/styled";

import { MoviesType } from "pages/MovieList";

type CardPropType = {
  movies: MoviesType[];
};

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;

  @media (max-width: 600px) {
    gap: 1em;
    display: flex;
    flex-direction: column;
  }
`;

const MovieCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: whitesmoke;
  box-shadow: 4px 8px 16px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const Button = styled.button`
  padding: 1em;
  margin-top: 1em;
  border: none;
  background: #a80038;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const Small = styled.small`
  font-weight: bold;
  padding: 8px 16px;
  color: white;
  border-radius: 24px;
  text-transform: uppercase;
  width: max-content;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 2em;
  right: 2em;
`;

const TitleContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  text-align: center;
  justify-content: center;
  padding-top: 0.5em;
  backdrop-filter: blur(5px);
  font-size: 1.5em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Img = styled.img`
  min-height: 800px;
  width: 100%;
  background: rgba(10, 10, 10, 0.1);
  object-fit: cover;
`;

export const Card = ({ movies }: CardPropType) => {
  const navigate = useNavigate();
  return (
    <Container>
      {movies.map((mov, key) => (
        <MovieCard key={key}>
          <Img
            src={mov.Poster}
            alt={`poster for ${mov.Title}`}
            loading="lazy"
          />
          <TitleContainer>
            <span>{mov.Title}</span>
            <Button
              onClick={() => {
                navigate(`/movies/${mov.imdbID}`);
              }}
            >
              Details
            </Button>
          </TitleContainer>
          <Small>
            {mov.Type} - {mov.Year}
          </Small>
        </MovieCard>
      ))}
    </Container>
  );
};
