import { gql } from 'graphql-tag'

export const DAILY_TRADEIN_SUMMARY = gql`
  query dailyTradeinSummary {
    dailyTradeinSummary {
      date
      count
    }
  }
`
