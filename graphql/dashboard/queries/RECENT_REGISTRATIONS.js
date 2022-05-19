import { gql } from 'graphql-tag'

export const RECENT_REGISTRATIONS = gql`
  query recentRegistrations {
    tradeins(
      filter: { status: { eq: NEW } }
      paging: { first: 8 }
      sorting: { direction: DESC, field: createdAt }
    ) {
      edges {
        node {
          id
          createdAt
          name
          email
          phone
          status
        }
      }
    }
  }
`
