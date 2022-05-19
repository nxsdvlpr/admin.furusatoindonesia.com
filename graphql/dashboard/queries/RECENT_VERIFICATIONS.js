import { gql } from 'graphql-tag'

export const RECENT_VERIFICATIONS = gql`
  query recentVerifications {
    tradeins(
      filter: { status: { eq: VALIDATED } }
      paging: { first: 8 }
      sorting: { direction: DESC, field: validatedAt }
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
