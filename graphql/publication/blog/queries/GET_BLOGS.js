import { gql } from 'graphql-tag'

export const GET_BLOGS = gql`
  query getBlogs($paging: CursorPaging!, $query: String, $sorting: BlogSort!) {
    blogs(
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
          user {
            id
            name
          }
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
