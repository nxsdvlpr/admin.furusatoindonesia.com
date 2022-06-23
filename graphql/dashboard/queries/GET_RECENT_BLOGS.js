import { gql } from 'graphql-tag'

export const GET_RECENT_BLOGS = gql`
  query getRecentBlogs {
    blogs(
      paging: { first: 5 }
      sorting: { field: publishedAt, direction: DESC }
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
    }
  }
`
