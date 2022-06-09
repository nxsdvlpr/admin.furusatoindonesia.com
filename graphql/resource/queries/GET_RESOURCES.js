import { gql } from 'graphql-tag'

export const GET_RESOURCES = gql`
  query getResources(
    $paging: CursorPaging!
    $query: String
    $sorting: ResourceSort!
  ) {
    resources(
      paging: $paging
      filter: {
        or: [{ subject: { iLike: $query } }, { excerpt: { iLike: $query } }]
      }
      sorting: [$sorting]
    ) {
      edges {
        node {
          id
          slug
          subject
          subjectJp
          excerpt
          excerptJp
          body
          bodyJp
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
