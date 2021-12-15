import { gql } from "@apollo/client";

const ALL_CHARACTERS = gql`
query getAllCharacters ($first: Int, $last: Int, $after: String, $before: String) {
  allPeople (first: $first, last: $last, after: $after, before: $before) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        name
        eyeColor
        gender
        hairColor
        skinColor
        homeworld {
          name
        }
      }
    }
  }
}
`;

const GET_CHARACTER = gql`
query getCharacter ($id: ID) {
  person(id: $id) {
    id
    name
    eyeColor
    gender
    hairColor
    skinColor
    homeworld {
      name
    }
    filmConnection {
      films {
        title
        episodeID
        director
        producers
        releaseDate
      }
    }
  }
}
`

export { ALL_CHARACTERS, GET_CHARACTER };
