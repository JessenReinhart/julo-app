import { useContext } from "react";

import { Section } from "./MovieList";
import { Card } from "components/Card";

import { MovieContext } from "App";

export const MyList = () => {
  const { state } = useContext(MovieContext);

  return (
    <Section>
      <h3>Saved Movies</h3>
      {state.length === 0 ? (
        <span>Your list is empty...</span>
      ) : (
        <Card movies={state} />
      )}
    </Section>
  );
};
