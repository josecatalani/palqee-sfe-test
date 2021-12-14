import { gql } from "@apollo/client";

const ALL_CHARACTERS = gql`
query getAllCharacters ($first: Int, $after: String, $before: String, $last: Int) {
  allPeople (first: $first, after: $after, before: $before, last: $last) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
    people {
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
