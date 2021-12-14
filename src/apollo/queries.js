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

export { ALL_CHARACTERS };
