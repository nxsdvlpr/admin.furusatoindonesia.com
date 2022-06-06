import { gql } from 'graphql-tag'

export const GET_TESTIMONIES = gql`
  query getTestimonies(
    $paging: CursorPaging!
    $query: String
    $sorting: TestimonySort!
  ) {
    testimonies(
      paging: $paging
      filter: {
        or: [{ fullname: { iLike: $query } }, { message: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          fullname
          profession
          message
          avatar
          logo
        }
      }
      totalCount
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
    }
  }
`
