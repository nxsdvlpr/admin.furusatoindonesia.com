import { gql } from 'graphql-tag'

export const TRADEIN_SUMMARY = gql`
  query tradeinSummary {
    tradeinSummary {
      total
      todayRegistrationCount
      todayVerificationCount
    }
  }
`
