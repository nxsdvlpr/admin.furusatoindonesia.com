import { gql } from 'graphql-tag'

export const GET_ESTORES = gql`
  query getEstores(
    $paging: CursorPaging!
    $query: String
    $sorting: UserSort!
  ) {
    userAggregate(
      filter: {
        or: [{ name: { iLike: $query } }, { username: { iLike: $query } }]
      }
    ) {
      count {
        id
      }
    }
    users(
      paging: $paging
      filter: {
        and: { role: { name: { in: ["estore"] } } }
        or: [{ name: { iLike: $query } }, { username: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          name
          username
          phone
        }
      }
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
