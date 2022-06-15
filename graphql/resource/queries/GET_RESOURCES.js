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
          subjectJa
          excerpt
          excerptJa
          body
          bodyJa
          image
          file
          videoUrl
          published
          publishedAt
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
