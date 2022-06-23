import { gql } from 'graphql-tag'

export const GET_TOTAL_UNREAD_MESSAGE = gql`
  query totalUnreadMessage {
    messageAggregate(filter: { and: [{ alreadyRead: { is: false } }] }) {
      count {
        id
      }
    }
  }
`
