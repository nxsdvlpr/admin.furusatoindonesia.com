import { gql } from 'graphql-tag'

export const DESTROY_MESSAGES = gql`
  mutation destroyMessages($ids: [ID!]!) {
    deleteManyMessages(input: { filter: { id: { in: $ids } } }) {
      deletedCount
    }
  }
`
