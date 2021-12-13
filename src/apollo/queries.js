import { gql } from "@apollo/client";

const ALL_FILMS = gql`
  query getAllFilms {
    allFilms {
      films {
        title
        director
      }
    }
  }
`;

export { ALL_FILMS };
