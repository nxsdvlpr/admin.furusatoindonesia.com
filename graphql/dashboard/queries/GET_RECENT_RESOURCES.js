import { gql } from 'graphql-tag'

export const GET_RECENT_RESOURCES = gql`
  query getRecentResources {
    resources(
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
          published
          publishedAt
        }
      }
    }
  }
`
